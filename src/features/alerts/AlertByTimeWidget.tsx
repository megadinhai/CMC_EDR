import { WidgetContainer } from "@/components/ui";
import { ColumnChart } from "@/components/charts";
import { useAlertsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { getTimeInterval } from "@/lib/time";

export function AlertByTimeWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useAlertsWidgets(timeRange);
  const points = data?.alertByTime ?? [];
  const status = resolveWidgetStatus(isLoading, isError, points.length === 0);
  const { unit } = getTimeInterval(timeRange.from, timeRange.to);

  return (
    <WidgetContainer title="Alert by Time" status={status}>
      <ColumnChart data={points} unit={unit} />
    </WidgetContainer>
  );
}
