/**
 * Presentational only — the BA spec and Figma design show this control in
 * the header, but no tenant/agent-group filtering logic is defined
 * anywhere in the spec (mock API has no tenant dimension). Wire up once
 * that data model exists.
 */
export function TenantFilter() {
  return (
    <button
      type="button"
      disabled
      title="Not wired up — no tenant/agent-group data model in the BA spec"
      className="flex h-10 w-[291px] items-center justify-between rounded-[5px] border border-white/20 bg-white/0 px-4 text-sm font-semibold text-white/20"
    >
      Filter by Tenant or Agent Group
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
