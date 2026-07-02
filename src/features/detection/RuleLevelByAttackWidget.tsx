import { WidgetContainer } from "@/components/ui";
import { BarChartHorizontal } from "@/components/charts";
import { useDetectionWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";

export function RuleLevelByAttackWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useDetectionWidgets(timeRange);
  const items = data?.ruleLevelByAttack ?? [];
  const status = resolveWidgetStatus(isLoading, isError, items.length === 0);

  return (
    <WidgetContainer title="Rule Level by Attack" status={status}>
      <BarChartHorizontal
        data={items.map((i) => ({ name: i.technique, value: i.count }))}
      />
    </WidgetContainer>
  );
}
