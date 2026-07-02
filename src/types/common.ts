export type Severity = "Critical" | "High" | "Medium" | "Low" | "Information";

export type TimeUnit = "minute" | "hour" | "day";

export interface TimeSeriesPoint {
  timestamp: string;
  count: number;
}

export interface NamedCount {
  name: string;
  count: number;
}

export type QuickRangePreset =
  | "last-15-min"
  | "last-1-hour"
  | "last-24-hours"
  | "last-7-days"
  | "last-30-days"
  | "custom"
  /** Not a real preset — dev-only escape hatch to force every widget into the No Data state. */
  | "no-data-demo";

export interface TimeRange {
  preset: QuickRangePreset;
  /** ISO 8601 */
  from: string;
  /** ISO 8601 */
  to: string;
}

export interface TimeRangeQuery {
  from: string;
  to: string;
}

export type WidgetStatus = "loading" | "no-data" | "error" | "ready";
