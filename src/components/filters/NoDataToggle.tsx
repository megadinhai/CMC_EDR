import clsx from "clsx";
import { useSetPresetRange, useTimeRange } from "@/store/useDashboardStore";

/** Dev-only escape hatch (BA spec 4.3 / prompt 6.2): forces every widget into the "No Data" state for QA. */
export function NoDataToggle() {
  const timeRange = useTimeRange();
  const setPresetRange = useSetPresetRange();
  const active = timeRange.preset === "no-data-demo";

  return (
    <button
      type="button"
      onClick={() => setPresetRange(active ? "last-7-days" : "no-data-demo")}
      title="Toggle a mock time range with zero data, to preview the No Data state"
      className={clsx(
        "rounded-md border px-3 py-2 text-xs font-medium transition-colors",
        active
          ? "border-severity-medium/50 bg-severity-medium/10 text-severity-medium"
          : "border-surface-border text-slate-400 hover:border-slate-600",
      )}
    >
      No Data demo
    </button>
  );
}
