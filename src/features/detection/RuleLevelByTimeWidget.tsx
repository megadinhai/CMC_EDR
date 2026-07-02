import { WidgetContainer, Legend } from "@/components/ui";
import { LineChartMulti } from "@/components/charts";
import { useDetectionWidgets } from "@/api/hooks";
import { useTimeRange } from "@/store/useDashboardStore";
import { resolveWidgetStatus } from "@/lib/widgetStatus";
import { getTimeInterval } from "@/lib/time";
import { SEVERITY_COLORS } from "@/lib/colors";
import type { Severity } from "@/types";

const LEVELS: Severity[] = ["Information", "Low", "Medium", "High", "Critical"];

export function RuleLevelByTimeWidget() {
  const timeRange = useTimeRange();
  const { data, isLoading, isError } = useDetectionWidgets(timeRange);
  const points = data?.ruleLevelByTime ?? [];
  const status = resolveWidgetStatus(isLoading, isError, points.length === 0);
  const { unit } = getTimeInterval(timeRange.from, timeRange.to);

  const totalsByLevel = LEVELS.map((level) =>
    points.reduce((sum, p) => sum + p[level], 0),
  );

  return (
    <WidgetContainer title="Rule Level by Time" status={status} bodyClassName="flex h-full items-center gap-8">
      <div className="min-w-0 flex-1">
        <LineChartMulti
          data={points}
          timestampKey="timestamp"
          unit={unit}
          series={LEVELS.map((level) => ({
            key: level,
            label: level,
            color: SEVERITY_COLORS[level],
          }))}
        />
      </div>
      <div className="w-44 shrink-0">
        <Legend
          items={LEVELS.map((level, idx) => ({
            label: level,
            value: totalsByLevel[idx],
            color: SEVERITY_COLORS[level],
          }))}
        />
      </div>
    </WidgetContainer>
  );
}
