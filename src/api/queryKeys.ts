import type { TimeRange } from "@/types";

function rangeParams(range: TimeRange) {
  return {
    from: range.from,
    to: range.to,
    noData: range.preset === "no-data-demo" ? "true" : undefined,
  };
}

export const queryKeys = {
  overview: (range: TimeRange) => ["dashboard-overview", rangeParams(range)] as const,
  agentsGroup: (range: TimeRange) => ["dashboard-agents", rangeParams(range)] as const,
  eventsGroup: (range: TimeRange) => ["dashboard-events", rangeParams(range)] as const,
  detectionGroup: (range: TimeRange) => ["dashboard-detection", rangeParams(range)] as const,
  alertsGroup: (range: TimeRange) => ["dashboard-alerts", rangeParams(range)] as const,
  casesGroup: (range: TimeRange) => ["dashboard-cases", rangeParams(range)] as const,
};

export { rangeParams };
