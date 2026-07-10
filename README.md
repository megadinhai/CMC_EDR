# EDR Default Dashboard

React + TypeScript + Tailwind + Zustand + React Query + MSW implementation of the
EDR Default Dashboard described in `BA Document/edr-dashboard-claude-prompt.md`.
14 widgets across 5 groups (Agents, Events, Detection Engine, Alerts, Case), backed
by a mocked REST API with an enforced data-consistency contract.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run typecheck # tsc -b --noEmit
npm run build      # production build
```

MSW starts automatically — in dev *and* in production builds
(`src/main.tsx`) — and intercepts every `/api/dashboard/*` call. There is no
real backend; the mock layer is the only data source, including on the
GitHub Pages deploy below.

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds
the app and deploys `dist/` via `actions/deploy-pages`. Live at
`https://megadinhai.github.io/CMC_EDR/`.

One-time setup required in the repo (not doable from the CLI): **Settings →
Pages → Source → GitHub Actions**.

`vite.config.ts` hardcodes `base: "/CMC_EDR/"` to match this project's GitHub
Pages URL — `npm run build` and `npm run preview` both use it. Only
`npm run dev` overrides it back to `/` via the `--base` CLI flag (which wins
over the config value), so local development isn't affected. If you fork
this repo under a different name, update `base` to match.

If you ever regenerate `node_modules`, MSW needs its service worker file in
`public/`; it's already committed, but it can be regenerated with:

```bash
npx msw init public --save
```

## Architecture decisions

**React Query owns server data, Zustand owns UI state.** `useDashboardStore`
(`src/store/useDashboardStore.ts`) holds only the selected time range. All
widget data lives in React Query's cache (`src/api/hooks.ts`). This keeps a
single source of truth per concern: there's never a question of whether the
"real" agent count lives in the store or in a query result.

**One network call powers all 14 widgets by default.** Every per-group hook
(`useAgentsWidgets`, `useAlertsWidgets`, ...) and the page-level
`useDashboardOverview` hook use the *same* React Query key
(`['dashboard-overview', params]`) against `/api/dashboard/overview`, differing
only in their `select`. React Query de-dupes identical keys into a single
request, so the page fires one fetch, and each feature widget still only
re-renders when its own slice of the response changes. The per-group REST
endpoints from the BA spec (`/api/dashboard/agents`, `/api/dashboard/events`,
etc.) are implemented and exposed via `useAgentsWidgetsStandalone`-style hooks
for a future "reload just this section" affordance — they're not wired into
the default page path today.

**Widget status is derived, not stored.** `resolveWidgetStatus()`
(`src/lib/widgetStatus.ts`) maps `{isLoading, isError, isEmpty}` to
`loading | error | no-data | ready`. Each widget computes its own "empty" —
e.g. `topAgents.length === 0`, `sum(alertBySeverity) === 0` — so one widget
having no data never affects its siblings (BA rule 4.3).

## Data consistency (BA rule 4.2)

Mock data is generated per time range with a deterministic seeded PRNG
(`src/lib/math.ts#createRng`, seeded from `from|to`) so a given range always
reproduces the same numbers. Cross-widget totals are enforced at generation
time with `splitTotal()` (largest-remainder method — guarantees the parts of
a breakdown sum to *exactly* the total, not just approximately):

- `Agent by Status` total === `Agent by OS Type` total
- `Alert by Severity` total === `Alert by Status` total
- `Case by Severity` total === `Case by Status` total === `Case by Incident Tags` total

`src/mocks/validator.ts#validateDashboardConsistency` asserts all three rules
and throws if any mismatch. It runs once at dev-server/module init
(`src/mocks/browser.ts`) against a canonical dataset, and again inside every
`/api/dashboard/overview` handler call — so a future edit to the generator
that breaks consistency fails loudly instead of silently shipping mismatched
charts.

## Triggering the "No Data" state

Click **No Data demo** in the header (`src/components/filters/NoDataToggle.tsx`).
It's a dev-only escape hatch: it sets the time range preset to
`no-data-demo`, which the API client turns into `?noData=true`, and the MSW
handler returns an all-empty payload (BA rule 4.3 / prompt spec 6). Every
widget independently falls back to its `No Data` state — nothing else on the
page breaks.

## Visual design

Layout, colors, and typography are pulled directly from the Figma file
(`CMC | EDR — 07-10-2025`, node `22263:142888`) via the Figma MCP dev-mode
tools — not hand-guessed. Design tokens live in `src/lib/colors.ts` and the
`tailwind.config.ts` `theme.extend.colors` block:

- Page background `#070e18`, card background `#08101d`, card border
  `rgba(255,255,255,0.15)`, 10px card radius — straight from the Figma
  `Background/*` and `Stroke/Table Stroke` variables.
- Severity scale is **not** the conventional red/orange/yellow/blue/grey.
  Figma's `Label/Fill/*` tokens map Critical→red `#ff4e4e`, High→orange
  `#ff6a00`, Medium→yellow `#f6ff00`, Low→green `#00cf29`,
  Information(al)→blue `#0890dc`. This looks unusual on first read (green for
  "Low", blue for "Info") but it's what the design file specifies, and it's
  applied consistently everywhere severity appears (number cards, Rule Level
  by Time legend/lines).
- Every single-series bar/column chart (Top Agents, Rule Level by Attack,
  Case by Assignee, Event by Time, Alert by Time) uses one flat accent color
  (`PRIMARY_BLUE`, `#0890dc`) with a translucent grey track behind the value
  bar — not a rainbow per-row palette.
- Donut center label is always "Total" (not "Agents"/"Cases"/etc.), matching
  every donut in the design file.
- Severity/status number cards (Alert by Severity, Case by Severity) render
  as N standalone bordered boxes with no wrapping "titled container" — this
  is the one widget shape that differs from the rest of the dashboard, and
  `components/ui/NumberCardRow.tsx` exists specifically to reproduce it
  (including collapsing to one shared loading/error/no-data card).
- Case by Incident Tags: Figma's mock content shows 6 tag categories
  (Incident, Pending, Confirmed, Suspicious, False Positive, Other), but the
  BA text spec only defines 3 (False positive, Suspicious, Incident). Per the
  prompt's own tie-breaker rule ("layout/color theo Figma, logic dữ liệu theo
  BA"), the widget keeps the BA's 3 tags and borrows their colors from the
  matching Figma entries (Incident→dark red `#c4162a`, Suspicious→blue
  `#0890dc`, False positive→dark purple `#8f3bb8`).
- "Filter by Tenant or Agent Group" appears in the header per Figma, but
  BA spec defines no tenant/agent-group filtering logic or data model — it's
  rendered as a disabled, presentational control
  (`components/filters/TenantFilter.tsx`) so the header layout matches
  without inventing behavior the spec doesn't define.
- Font is Figma's `SVN-Gilroy`, a licensed/internal typeface not available
  publicly — `tailwind.config.ts` lists it first in the font stack (falls
  back to Inter/system-ui, which is metrically close) rather than shipping
  the actual font file.

## Assumptions made (spec was ambiguous or silent)

- **Case severity label**: BA doc mixes "Information" (alerts) and
  "Informational" (cases). Kept both distinct per their own widget (`Severity`
  vs `CaseSeverity` types), with the same color mapped to both via
  `CASE_SEVERITY_COLORS`.
- **Auth guard**: no login screen exists per the prompt; `App.tsx` has a
  comment marking where a real auth guard would wrap `<DashboardPage />`.
- **Grid layout**: matches the Figma sections exactly — 3-column rows for
  Agents and the Top Tactics/Rule Level by Attack pair, full-width for
  time-series charts and severity number-card rows, 2-column for Alert by
  Status/Time, 3-column for Case by Status/Assignee/Incident Tags (see
  "Visual design" above for how it was sourced).
- **Case by Assignee ("open" cases)**: the spec says "case open theo
  assignee". The mock ties assignee totals to the `In progress + New` portion
  of `caseByStatus` (i.e., cases not yet `Close`), since "open" isn't a
  separate status value anywhere else in the spec.
- **Refresh button**: invalidates every `dashboard-*` React Query key
  (i.e., refetches the current time range), matching
  `useDashboardStore`'s original `refreshAll` intent from the prompt, adapted
  to the React-Query-owns-data architecture (see above).
- **Custom range picker**: uses native `<input type="datetime-local">` rather
  than a custom calendar widget, to keep the component footprint small; swap
  in a richer date-range component later if the design calls for one.
- **App shell sidebar** (`src/components/layout/Sidebar.tsx`): sourced from
  Figma nodes `22263:143589` (collapsed) and `25749:143614` (expanded) — the
  full CMC EDR product nav, not something the BA spec defines. Only
  "Dashboards → Manage" is a real route (this app); every other item
  (Vulnerability Detection, Reporting, Security Management, System
  Management, Threat Detection/Alert/Case Management, Configuration, etc.)
  is rendered for visual completeness but is `disabled` — there's no
  corresponding page or route to send it to, and adding a router for 23
  pages the spec never describes would be inventing scope. Icons are
  hand-drawn local SVGs approximating each Figma icon's concept (grid, bug,
  shield, bell, ...) rather than pixel-exact exports, since Figma's
  per-node asset URLs are short-lived (7 days) and unsuitable to hardcode.

## Project structure

```
src/
  app/            App shell (Layout, App) — QueryClientProvider + header + sidebar
  components/
    charts/       Recharts wrappers: Donut, BarChartHorizontal, Column, LineChartMulti, NumberCard
    ui/           Card, WidgetContainer (loading/no-data/error), Skeleton, NoData, ErrorState, Legend
    filters/      DateTimePicker, QuickRange, NoDataToggle, TenantFilter
    layout/       Sidebar (collapsed/expanded product nav), navigation.ts, navIcons.tsx
  features/       14 widgets grouped by BA domain: agents, events, detection, alerts, cases
  store/          useDashboardStore (time range UI state only)
  api/            fetch client, query keys, React Query hooks
  mocks/          MSW handlers, seeded data generators, consistency validator
  types/          Shared TypeScript types per domain + DashboardOverviewResponse
  lib/            colors.ts, formatters.ts (formatNumber), time.ts (getTimeInterval), math.ts, widgetStatus.ts
  pages/          DashboardPage.tsx — assembles all 14 widgets
```
