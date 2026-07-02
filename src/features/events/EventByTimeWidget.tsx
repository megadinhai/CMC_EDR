import { WidgetContainer } from "@/components/ui";
import { ColumnChart } from "@/components/charts";
import { useEventsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { getTimeInterval } from "@/lib/time";

export function EventByTimeWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useEventsWidgets(timeRange);
  const points = data?.eventByTime ?? [];
  const status = resolveWidgetStatus(isLoading, isError, points.length === 0);
  const { unit } = getTimeInterval(timeRange.from, timeRange.to);

  return (
    <WidgetContainer title="Event by Time" status={status}>
      <ColumnChart data={points} unit={unit} />
    </WidgetContainer>
  );
}
