import { WidgetContainer, Legend } from "@/components/ui";
import { DonutChart } from "@/components/charts";
import { useAgentsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { AGENT_STATUS_COLORS } from "@/lib/colors";

export function AgentByStatusWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useAgentsWidgets(timeRange);
  const items = data?.agentByStatus ?? [];
  const total = items.reduce((sum, i) => sum + i.count, 0);
  const status = resolveWidgetStatus(isLoading, isError, total === 0);

  return (
    <WidgetContainer title="Agent by Status" status={status} bodyClassName="flex h-full items-center gap-4">
      <div className="h-[216px] w-[216px] shrink-0">
        <DonutChart
          data={items.map((i) => ({
            name: i.status,
            value: i.count,
            color: AGENT_STATUS_COLORS[i.status],
          }))}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center">
        <Legend
          items={items.map((i) => ({
            label: i.status,
            value: i.count,
            color: AGENT_STATUS_COLORS[i.status],
          }))}
        />
      </div>
    </WidgetContainer>
  );
}
