import { WidgetContainer, Legend } from "@/components/ui";
import { DonutChart } from "@/components/charts";
import { useCasesWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { INCIDENT_TAG_COLORS } from "@/lib/colors";

export function CaseByIncidentTagsWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useCasesWidgets(timeRange);
  const items = data?.caseByIncidentTags ?? [];
  const total = items.reduce((sum, i) => sum + i.count, 0);
  const status = resolveWidgetStatus(isLoading, isError, total === 0);

  return (
    <WidgetContainer title="Case by Incident Tags" status={status} bodyClassName="flex h-full items-center gap-4">
      <div className="h-[216px] w-[216px] shrink-0">
        <DonutChart
          data={items.map((i) => ({
            name: i.tag,
            value: i.count,
            color: INCIDENT_TAG_COLORS[i.tag],
          }))}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center">
        <Legend
          items={items.map((i) => ({
            label: i.tag,
            value: i.count,
            color: INCIDENT_TAG_COLORS[i.tag],
          }))}
        />
      </div>
    </WidgetContainer>
  );
}
