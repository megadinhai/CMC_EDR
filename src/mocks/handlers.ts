import { delay, http, HttpResponse } from "msw";
import { buildDashboardOverview, buildEmptyDashboardOverview } from "./generators";
import { validateDashboardConsistency } from "./validator";
import type { DashboardOverviewResponse } from "@/types";

const MIN_DELAY_MS = 300;
const MAX_DELAY_MS = 800;

async function simulateNetworkDelay(): Promise<void> {
  const ms = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
  await delay(ms);
}

function resolveOverview(url: URL): DashboardOverviewResponse {
  const noData = url.searchParams.get("noData") === "true";
  if (noData) {
    return buildEmptyDashboardOverview();
  }

  const now = new Date();
  const from = url.searchParams.get("from") ?? new Date(now.getTime() - 7 * 86400000).toISOString();
  const to = url.searchParams.get("to") ?? now.toISOString();

  const data = buildDashboardOverview(from, to);
  validateDashboardConsistency(data);
  return data;
}

export const handlers = [
  http.get("/api/dashboard/overview", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() => HttpResponse.json(resolveOverview(url)));
  }),

  http.get("/api/dashboard/agents", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() =>
      HttpResponse.json(resolveOverview(url).agents),
    );
  }),

  http.get("/api/dashboard/events", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() =>
      HttpResponse.json(resolveOverview(url).events),
    );
  }),

  http.get("/api/dashboard/detection", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() =>
      HttpResponse.json(resolveOverview(url).detection),
    );
  }),

  http.get("/api/dashboard/alerts", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() =>
      HttpResponse.json(resolveOverview(url).alerts),
    );
  }),

  http.get("/api/dashboard/cases", ({ request }) => {
    const url = new URL(request.url);
    return simulateNetworkDelay().then(() =>
      HttpResponse.json(resolveOverview(url).cases),
    );
  }),
];
