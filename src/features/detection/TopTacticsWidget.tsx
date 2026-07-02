import { WidgetContainer, Legend } from "@/components/ui";
import { DonutChart } from "@/components/charts";
import { useDetectionWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { colorForIndex } from "@/lib/colors";

export function TopTacticsWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useDetectionWidgets(timeRange);
  const items = data?.topTactics ?? [];
  const status = resolveWidgetStatus(isLoading, isError, items.length === 0);

  return (
    <WidgetContainer title="Top Tactics" status={status} bodyClassName="flex h-full items-center gap-4">
      <div className="h-[216px] w-[216px] shrink-0">
        <DonutChart
          data={items.map((i, idx) => ({
            name: i.tactic,
            value: i.count,
            color: colorForIndex(idx),
          }))}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center">
        <Legend
          items={items.map((i, idx) => ({
            label: i.tactic,
            value: i.count,
            percentage: i.percentage,
            color: colorForIndex(idx),
          }))}
        />
      </div>
    </WidgetContainer>
  );
}
