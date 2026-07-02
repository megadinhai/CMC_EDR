export * from "./common";
export * from "./agents";
export * from "./events";
export * from "./detection";
export * from "./alerts";
export * from "./cases";

import type { AgentsWidgetsData } from "./agents";
import type { EventsWidgetsData } from "./events";
import type { DetectionWidgetsData } from "./detection";
import type { AlertsWidgetsData } from "./alerts";
import type { CasesWidgetsData } from "./cases";

export interface DashboardOverviewResponse {
  agents: AgentsWidgetsData;
  events: EventsWidgetsData;
  detection: DetectionWidgetsData;
  alerts: AlertsWidgetsData;
  cases: CasesWidgetsData;
}
