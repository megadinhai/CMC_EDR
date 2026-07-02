import type { QuickRangePreset, TimeRange, TimeUnit } from "@/types";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const QUICK_RANGE_LABELS: Record<QuickRangePreset, string> = {
  "last-15-min": "Last 15 minutes",
  "last-1-hour": "Last 1 hour",
  "last-24-hours": "Last 24 hours",
  "last-7-days": "Last 7 days",
  "last-30-days": "Last 30 days",
  custom: "Custom range",
  "no-data-demo": "No Data (demo)",
};

export const QUICK_RANGE_PRESETS: QuickRangePreset[] = [
  "last-15-min",
  "last-1-hour",
  "last-24-hours",
  "last-7-days",
  "last-30-days",
];

const PRESET_DURATION_MS: Partial<Record<QuickRangePreset, number>> = {
  "last-15-min": 15 * MINUTE,
  "last-1-hour": 1 * HOUR,
  "last-24-hours": 24 * HOUR,
  "last-7-days": 7 * DAY,
  "last-30-days": 30 * DAY,
  "no-data-demo": 7 * DAY,
};

/** Builds a concrete {from, to} for a preset, anchored to `now`. Custom ranges must supply their own from/to. */
export function buildTimeRange(
  preset: QuickRangePreset,
  now: Date,
  custom?: { from: string; to: string },
): TimeRange {
  if (preset === "custom") {
    if (!custom) {
      throw new Error("Custom time range requires explicit from/to");
    }
    return { preset, from: custom.from, to: custom.to };
  }

  const durationMs = PRESET_DURATION_MS[preset] ?? 7 * DAY;
  const to = now.toISOString();
  const from = new Date(now.getTime() - durationMs).toISOString();
  return { preset, from, to };
}

export function defaultTimeRange(now: Date): TimeRange {
  return buildTimeRange("last-7-days", now);
}

export interface TimeIntervalConfig {
  unit: TimeUnit;
  /** Bucket width in milliseconds. */
  stepMs: number;
  /** Number of buckets spanning [from, to]. */
  bucketCount: number;
}

/**
 * Chooses a bucket size for time-series charts based on the span of the
 * range, so a chart never renders too few or too many points.
 */
export function getTimeInterval(from: string, to: string): TimeIntervalConfig {
  const spanMs = Math.max(0, new Date(to).getTime() - new Date(from).getTime());

  let unit: TimeUnit;
  let stepMs: number;

  if (spanMs <= 2 * HOUR) {
    unit = "minute";
    stepMs = 5 * MINUTE;
  } else if (spanMs <= 2 * DAY) {
    unit = "hour";
    stepMs = HOUR;
  } else {
    unit = "day";
    stepMs = DAY;
  }

  const bucketCount = Math.max(1, Math.ceil(spanMs / stepMs));
  return { unit, stepMs, bucketCount };
}

export function generateTimeBuckets(from: string, to: string): string[] {
  const { stepMs } = getTimeInterval(from, to);
  const start = new Date(from).getTime();
  const end = new Date(to).getTime();
  const buckets: string[] = [];

  for (let t = start; t <= end; t += stepMs) {
    buckets.push(new Date(t).toISOString());
  }
  if (buckets.length === 0) {
    buckets.push(new Date(start).toISOString());
  }
  return buckets;
}

export function formatBucketLabel(iso: string, unit: TimeUnit): string {
  const date = new Date(iso);
  if (unit === "minute") {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (unit === "hour") {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}
