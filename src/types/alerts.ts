import type { Severity, TimeSeriesPoint } from "./common";

export type AlertStatus = "Escalated" | "New" | "Acknowledged";

export interface AlertBySeverityItem {
  severity: Severity;
  count: number;
}

export interface AlertByStatusItem {
  status: AlertStatus;
  count: number;
}

export interface AlertsWidgetsData {
  alertBySeverity: AlertBySeverityItem[];
  alertByStatus: AlertByStatusItem[];
  alertByTime: TimeSeriesPoint[];
}
