import { WidgetContainer } from "@/components/ui";
import { BarChartHorizontal } from "@/components/charts";
import { useCasesWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";

export function CaseByAssigneeWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useCasesWidgets(timeRange);
  const items = data?.caseByAssignee ?? [];
  const status = resolveWidgetStatus(isLoading, isError, items.length === 0);

  return (
    <WidgetContainer title="Case by Assignee" status={status}>
      <BarChartHorizontal
        data={items.map((i) => ({ name: i.assignee, value: i.count }))}
      />
    </WidgetContainer>
  );
}
