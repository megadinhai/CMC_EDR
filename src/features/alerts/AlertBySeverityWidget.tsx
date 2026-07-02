import { NumberCardRow } from "@/components/ui";
import { useAlertsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { SEVERITY_COLORS } from "@/lib/colors";
import type { Severity } from "@/types";

const ORDER: Severity[] = ["Critical", "High", "Medium", "Low", "Information"];

export function AlertBySeverityWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useAlertsWidgets(timeRange);
  const items = data?.alertBySeverity ?? [];
  const total = items.reduce((sum, i) => sum + i.count, 0);
  const status = resolveWidgetStatus(isLoading, isError, total === 0);
  const bySeverity = new Map(items.map((i) => [i.severity, i.count]));

  return (
    <NumberCardRow
      status={status}
      cards={ORDER.map((severity) => ({
        label: severity,
        value: bySeverity.get(severity) ?? 0,
        color: SEVERITY_COLORS[severity],
      }))}
    />
  );
}
