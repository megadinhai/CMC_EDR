import type {
  AgentOsType,
  AgentStatus,
  AlertStatus,
  CaseStatus,
  IncidentTag,
  Severity,
} from "@/types";

/**
 * Single source of truth for widget colors. Values are pulled from the
 * Figma "CMC | EDR" design tokens (Label/Fill/* variables) — keep in sync
 * with tailwind.config.ts. Recharts needs literal hex values, it cannot
 * consume Tailwind classes.
 */
export const SEVERITY_COLORS: Record<Severity, string> = {
  Critical: "#ff4e4e",
  High: "#ff6a00",
  Medium: "#f6ff00",
  Low: "#00cf29",
  Information: "#0890dc",
};

/** Case severity reuses the same scale; "Informational" maps to the same color as "Information". */
export const CASE_SEVERITY_COLORS: Record<string, string> = {
  Critical: SEVERITY_COLORS.Critical,
  High: SEVERITY_COLORS.High,
  Medium: SEVERITY_COLORS.Medium,
  Low: SEVERITY_COLORS.Low,
  Informational: SEVERITY_COLORS.Information,
};

export const AGENT_STATUS_COLORS: Record<AgentStatus, string> = {
  Online: "#00cf29",
  Offline: "#7b7b7b",
};

export const AGENT_OS_COLORS: Record<AgentOsType, string> = {
  Windows: "#1f60c4",
  Linux: "#7b7b7b",
  CentOS: "#e0b400",
  RedHat: "#0890dc",
  Ubuntu: "#8f3bb8",
};

export const ALERT_STATUS_COLORS: Record<AlertStatus, string> = {
  Escalated: "#ff4e4e",
  New: "#f6ff00",
  Acknowledged: "#00cf29",
};

export const CASE_STATUS_COLORS: Record<CaseStatus, string> = {
  Close: "#00cf29",
  "In progress": "#f6ff00",
  New: "#0890dc",
};

export const INCIDENT_TAG_COLORS: Record<IncidentTag, string> = {
  "False positive": "#8f3bb8",
  Suspicious: "#0890dc",
  Incident: "#c4162a",
};

/** Primary accent — used for every single-series bar/column chart (Top Agents, Rule Level by Attack, Case by Assignee, Event/Alert by Time). */
export const PRIMARY_BLUE = "#0890dc";

/** Bar track background behind horizontal bar values (Label/Fill/Grey @ 20%). */
export const BAR_TRACK_COLOR = "rgba(123,123,123,0.2)";

/** Deterministic fallback palette for open-ended categorical series (tactics, techniques). */
export const CATEGORICAL_PALETTE = [
  "#0890dc",
  "#00cf29",
  "#ff6a00",
  "#f6ff00",
  "#8f3bb8",
  "#ff4e4e",
  "#1f60c4",
  "#e0b400",
  "#7b7b7b",
  "#c4162a",
];

export function colorForIndex(index: number): string {
  return CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length];
}
