import { WidgetContainer, Legend } from "@/components/ui";
import { DonutChart } from "@/components/charts";
import { useAgentsWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { AGENT_OS_COLORS } from "@/lib/colors";

export function AgentByOsTypeWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useAgentsWidgets(timeRange);
  const items = data?.agentByOsType ?? [];
  const total = items.reduce((sum, i) => sum + i.count, 0);
  const status = resolveWidgetStatus(isLoading, isError, total === 0);

  return (
    <WidgetContainer title="Agent by OS Type" status={status} bodyClassName="flex h-full items-center gap-4">
      <div className="h-[216px] w-[216px] shrink-0">
        <DonutChart
          data={items.map((i) => ({
            name: i.os,
            value: i.count,
            color: AGENT_OS_COLORS[i.os],
          }))}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center">
        <Legend
          items={items.map((i) => ({
            label: i.os,
            value: i.count,
            color: AGENT_OS_COLORS[i.os],
          }))}
        />
      </div>
    </WidgetContainer>
  );
}
