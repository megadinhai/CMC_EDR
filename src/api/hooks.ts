import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { fetchJson } from "./client";
import { queryKeys, rangeParams } from "./queryKeys";
import type {
  AgentsWidgetsData,
  AlertsWidgetsData,
  CasesWidgetsData,
  DashboardOverviewResponse,
  DetectionWidgetsData,
  EventsWidgetsData,
  TimeRange,
} from "@/types";

const STALE_TIME_MS = 30_000;

/**
 * Single source of truth for the page's default load: one request returns
 * all 14 widgets (see BA spec 6, `/api/dashboard/overview`). Feature-group
 * hooks below reuse this same query key with a `select`, so React Query
 * de-dupes them into one network call while still letting each feature
 * subscribe to just its own slice (no extra re-renders when other slices
 * change... there are none, since the whole payload lands in one response).
 */
function overviewQueryOptions(range: TimeRange) {
  return {
    queryKey: queryKeys.overview(range),
    queryFn: () =>
      fetchJson<DashboardOverviewResponse>("/api/dashboard/overview", rangeParams(range)),
    staleTime: STALE_TIME_MS,
  };
}

export function useDashboardOverview(range: TimeRange) {
  return useQuery(overviewQueryOptions(range));
}

export function useAgentsWidgets(range: TimeRange) {
  return useQuery({
    ...overviewQueryOptions(range),
    select: (data): AgentsWidgetsData => data.agents,
  });
}

export function useEventsWidgets(range: TimeRange) {
  return useQuery({
    ...overviewQueryOptions(range),
    select: (data): EventsWidgetsData => data.events,
  });
}

export function useDetectionWidgets(range: TimeRange) {
  return useQuery({
    ...overviewQueryOptions(range),
    select: (data): DetectionWidgetsData => data.detection,
  });
}

export function useAlertsWidgets(range: TimeRange) {
  return useQuery({
    ...overviewQueryOptions(range),
    select: (data): AlertsWidgetsData => data.alerts,
  });
}

export function useCasesWidgets(range: TimeRange) {
  return useQuery({
    ...overviewQueryOptions(range),
    select: (data): CasesWidgetsData => data.cases,
  });
}

/**
 * Standalone per-group endpoints (BA spec 6: "/api/dashboard/agents" etc.)
 * for local reload of a single section without refetching the whole
 * dashboard. Not used by the default page path, but available for e.g. a
 * future per-card refresh action.
 */
export function useAgentsWidgetsStandalone(range: TimeRange) {
  return useQuery({
    queryKey: queryKeys.agentsGroup(range),
    queryFn: () => fetchJson<AgentsWidgetsData>("/api/dashboard/agents", rangeParams(range)),
    staleTime: STALE_TIME_MS,
  });
}

export function useRefreshAll() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAll = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === "string" &&
          (query.queryKey[0] as string).startsWith("dashboard-"),
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient]);

  return { refreshAll, isRefreshing };
}
