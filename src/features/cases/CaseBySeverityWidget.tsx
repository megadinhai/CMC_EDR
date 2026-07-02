import { NumberCardRow } from "@/components/ui";
import { useCasesWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { CASE_SEVERITY_COLORS } from "@/lib/colors";
import type { CaseSeverity } from "@/types";

const ORDER: CaseSeverity[] = ["Critical", "High", "Medium", "Low", "Informational"];

export function CaseBySeverityWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useCasesWidgets(timeRange);
  const items = data?.caseBySeverity ?? [];
  const total = items.reduce((sum, i) => sum + i.count, 0);
  const status = resolveWidgetStatus(isLoading, isError, total === 0);
  const bySeverity = new Map(items.map((i) => [i.severity, i.count]));

  return (
    <NumberCardRow
      status={status}
      cards={ORDER.map((severity) => ({
        label: severity,
        value: bySeverity.get(severity) ?? 0,
        color: CASE_SEVERITY_COLORS[severity],
      }))}
    />
  );
}
