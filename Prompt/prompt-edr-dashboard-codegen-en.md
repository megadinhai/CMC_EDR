# PROMPT: GENERATE "EDR DEFAULT DASHBOARD" CODE (React + Tailwind + Zustand + Mock API)

> Copy everything below and paste it into **Claude Code** (or Figma Make). This is a complete, self-contained prompt — no edits needed.

---

## 0. ROLE & OBJECTIVE

You are a **Senior Frontend Engineer** specializing in SOC/EDR security dashboards. Generate the **complete source code** for the **EDR Default Dashboard** screen as a well-modularized React project.

**Mandatory references:**
- UI design (layout, colors, spacing, typography):
  `https://www.figma.com/design/98LKzTomvjr4pwGT2990gX/CMC-%7C-EDR--07-10-2025-?node-id=22263-142887`
- Business specification: sections **2–4** below (extracted from the BA document).

If the text and Figma conflict: **layout/colors follow Figma**, **data logic follows the BA spec**.

---

## 1. TECH STACK & TECHNICAL CONSTRAINTS

- **React 18 + TypeScript** (function components + hooks only, no class components).
- **Vite** as the build tool.
- **TailwindCSS** for all styling (no CSS-in-JS, no styled-components). Define design tokens (severity colors, status colors, etc.) in `tailwind.config.ts`.
- **Zustand** for state management (a dedicated store or slice per widget group — see section 5).
- **Chart library**: use **Recharts** (donut/pie, bar, column, line). Wrap it in project-owned wrapper components so it can be swapped out easily.
- **Mock API**: use **MSW (Mock Service Worker)** to simulate a REST API. All mock data must satisfy the **data consistency rules in section 4 at 100%**.
- **Data fetching**: use `@tanstack/react-query` to call the API; push results into Zustand (or let React Query own the cache while Zustand holds only UI state like the selected time range). Pick the cleaner approach and briefly justify it in the README.
- Code must be **type-safe** (declare interfaces/types for every API response).
- Support 3 display states for **every** widget: `loading` (skeleton), `no-data` ("No Data"), `error`.

---

## 2. FEATURE OVERVIEW

The dashboard shows an overview of EDR metrics across **5 groups**: Agents, Events, Detection Engine, Alerts, Case. Actors: System Admin, SOC Manager.

**Preconditions (assume already logged in with view permission):** no login screen needed, but the scaffold should leave a clear hook point for an auth guard later.

---

## 3. WIDGET SPECIFICATIONS (14 widgets)

> Each widget lists: chart type, data source (used to name mock endpoints realistically), and display rules.

### Group 1 — AGENTS
1. **Top Agents** — *Horizontal bar chart* — source: OpenSearch.
   - Up to 10 agents generating the most logs/events, sorted descending.
   - Each row: agent name, bar, log count on the right.
2. **Agent by Status** — *Donut* — source: MySQL.
   - 2 values: Online / Offline. Total in the donut center = Online + Offline.
   - Legend: color + status + count.
3. **Agent by OS Type** — *Donut* — source: MySQL.
   - By OS: Windows, Linux, CentOS, RedHat, Ubuntu… one color per OS. Total in the center. Legend: color + OS name + count.

### Group 2 — EVENTS
4. **Event by Time** — *Column chart* — source: OpenSearch.
   - Event count over time. Time interval **auto-adjusts** to the selected time range. Hovering a column shows a tooltip with the exact count.

### Group 3 — DETECTION ENGINE
5. **Top Tactics** — *Donut* — source: OpenSearch.
   - Group by Tactic, Count by AlertID. Up to 10 tactics. Total tactic count in the center. Legend: color + tactic name + count + **percentage**.
6. **Rule Level by Attack** — *Horizontal bar chart* — source: OpenSearch.
   - Group by Technique, Count by AlertID, descending. Up to 10 rows: technique name + bar + count.
7. **Rule Level by Time** — *Line chart* — source: OpenSearch.
   - X axis = time (auto interval), Y axis = rule count.
   - One line per level: **Information, Low, Medium, High, Critical**. Legend: color + level + count. Hover → tooltip.

### Group 4 — ALERTS
8. **Alert by Severity** — *Number cards* — source: OpenSearch.
   - 5 number cards, left→right order: **Critical, High, Medium, Low, Information**.
9. **Alert by Status** — *Donut* — source: OpenSearch.
   - Statuses: **Escalated, New, Acknowledged**. Total alerts in the center. Legend: color + status + count.
10. **Alert by Time** — *Column chart* — source: OpenSearch.
    - Alert count over time, auto interval, hover → exact count.

### Group 5 — CASE
11. **Case by Severity** — *Number cards* — source: MySQL.
    - 5 number cards in order: **Critical, High, Medium, Low, Informational**.
12. **Case by Status** — *Donut* — source: MySQL.
    - Statuses: **Close, In progress, New**. Total cases in the center. Legend: color + status + count.
13. **Case by Assignee** — *Horizontal bar chart* — source: MySQL.
    - **Open** case count per assignee, descending, up to 10 assignees. Each row: assignee name + bar + count.
14. **Case by Incident Tags** — *Donut* — source: MySQL.
    - Based on the Incident field, 3 tags: **False positive, Suspicious, Incident**. Total in the center. Legend: color + tag + count.

---

## 4. BUSINESS RULES (MANDATORY)

**4.1. Time Range**
- The entire dashboard displays data according to the user-selected time range.
- Default on first load: **Last 7 days**.
- Provide a **DateTime Picker** with Quick ranges (Last 15 min, Last 1 hour, Last 24 hours, Last 7 days, Last 30 days, Custom range). Changing the time range → re-fetch APIs → update all widgets.

**4.2. Data Consistency — mock data must match exactly:**
- Total agents in **Agent by Status** = total agents in **Agent by OS Type**.
- Total alerts in **Alert by Severity** = total alerts in **Alert by Status**.
- Total cases in **Case by Severity** = total cases in **Case by Status** = total cases in **Case by Incident Tags**.
- Write a **validator function** in the mock layer (run at initialization) that asserts these 3 constraints; throw immediately on violation so developers catch it right away.

**4.3. No Data state**
- If the selected time range has no data → each widget without data shows its own **"No Data"** state (never break the whole page).

---

## 5. STATE DESIGN (ZUSTAND)

- `useDashboardStore`: holds the current **time range** (preset + custom start/end), a `setTimeRange` action, an `isRefreshing` flag, and a `refreshAll` action.
- Split state by group if needed (agents / events / detection / alerts / cases), or let React Query own per-widget data while Zustand holds only shared filters. Pick one approach and apply it consistently.
- Selectors must avoid unnecessary re-renders (use shallow comparison / well-scoped selectors).

---

## 6. MOCK API (MSW)

Design endpoints **grouped for page-load performance** but still separable:
- `GET /api/dashboard/overview?from=...&to=...` → returns all 14 widgets in one response (the page uses this by default).
- Also expose per-group endpoints for partial reloads:
  `/api/dashboard/agents`, `/api/dashboard/events`, `/api/dashboard/detection`, `/api/dashboard/alerts`, `/api/dashboard/cases` — all accepting `from`, `to`.
- Responses must have explicit TypeScript types, and provide **2 mock datasets**:
  1. A "full" dataset (satisfying 4.2).
  2. A "No Data" dataset (empty arrays / count = 0) to test 4.3 — switchable via a query param or a special time-range preset.
- Add simulated latency (~300–800ms) so skeleton loading is visible.

---

## 7. FOLDER STRUCTURE (MODULARIZED)

Create a directory tree like the following (adjust sensibly if better, but keep modularization by business group):

```
src/
  app/                      # App shell, layout, routing
    Layout.tsx
    App.tsx
  components/               # Reusable "dumb" components
    charts/                 # DonutChart, BarChart, ColumnChart, LineChart, NumberCard (Recharts wrappers)
    ui/                     # Card, WidgetContainer, Skeleton, NoData, ErrorState, Legend
    filters/                # DateTimePicker, QuickRange
  features/                 # Split by the 5 business groups
    agents/                 # TopAgents, AgentByStatus, AgentByOsType widgets + hooks
    events/                 # EventByTime
    detection/              # TopTactics, RuleLevelByAttack, RuleLevelByTime
    alerts/                 # AlertBySeverity, AlertByStatus, AlertByTime
    cases/                  # CaseBySeverity, CaseByStatus, CaseByAssignee, CaseByIncidentTags
  store/                    # Zustand stores/slices
  api/                      # client, query keys, react-query hooks
  mocks/                    # MSW handlers + mock data generators + consistency validator
  types/                    # Shared TypeScript types (Severity, Status, WidgetResponse...)
  lib/                      # helpers: time interval calc, color maps, formatters
  pages/
    DashboardPage.tsx       # Composes all 14 widgets per the Figma layout
  main.tsx
```

---

## 8. UI REQUIREMENTS

- Responsive grid layout following Figma; desktop-first.
- Consistent severity/status color mapping across the app, declared centrally in `lib/colors.ts` + `tailwind.config.ts`:
  - Severity: Critical (dark red), High (orange), Medium (yellow), Low (light blue), Information/Informational (gray/pale blue).
  - Agent status: Online (green), Offline (gray).
- Dashboard header: title + DateTime Picker (top right) + Refresh button.
- Every widget lives in a uniform Card: title + chart area + loading/no-data/error states.

---

## 9. REQUIRED UTILITY FUNCTIONS

- `getTimeInterval(from, to)`: auto-selects the interval (minute/hour/day) for time-based charts based on time range length (used by Event by Time, Alert by Time, Rule Level by Time).
- `formatNumber(n)`: abbreviates large numbers (1.2k, 3.4M).
- The data consistency validator (section 4.2).

---

## 10. DELIVERABLES & ACCEPTANCE CRITERIA

Generate:
1. The full source tree per section 7, runnable immediately with `npm install && npm run dev`.
2. `package.json` with all dependencies.
3. `README.md`: how to run, state architecture rationale, how to enable the "No Data" mock dataset.
4. MSW fully set up and auto-enabled in dev.

**Accepted when:**
- Opening the app shows all 14 widgets with the default Last 7 days time range.
- Changing the time range reloads every widget with the new range.
- The 3 data consistency constraints (4.2) hold exactly, verified by the validator.
- Loading / no-data / error states are all implemented.
- TypeScript compiles without type errors; modules are cleanly separated.

---

## 11. WORKING ORDER

**Scaffold in this order**: (1) project init + config → (2) types + colors + tokens → (3) mock data + validator + MSW handlers → (4) api layer + store → (5) chart wrappers + ui components → (6) each feature widget → (7) compose `DashboardPage` → (8) README.

If anything in the spec is ambiguous, **make a reasonable assumption and note it in the README** — do not stop to ask. Start now.
