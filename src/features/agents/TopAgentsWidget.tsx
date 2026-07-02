import { WidgetContainer } from "@/components/ui";
import { BarChartHorizontal } from "@/components/charts";
import { useAgentsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";

export function TopAgentsWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useAgentsWidgets(timeRange);
  const topAgents = data?.topAgents ?? [];
  const status = resolveWidgetStatus(isLoading, isError, topAgents.length === 0);

  return (
    <WidgetContainer title="Top Agents" status={status}>
      <BarChartHorizontal
        data={topAgents.map((a) => ({ name: a.agentName, value: a.count }))}
      />
    </WidgetContainer>
  );
}
