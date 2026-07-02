import { sumBy } from "@/lib/formatters";
import type { DashboardOverviewResponse } from "@/types";

/**
 * Enforces BA rule 4.2 (data consistency): totals must match exactly across
 * the widgets that describe the same population from different angles.
 * Throws immediately so a broken generator is caught at dev-server startup
 * instead of silently shipping mismatched charts.
 */
export function validateDashboardConsistency(data: DashboardOverviewResponse): void {
  const totalAgentsByStatus = sumBy(data.agents.agentByStatus, (i) => i.count);
  const totalAgentsByOs = sumBy(data.agents.agentByOsType, (i) => i.count);
  assertEqual(
    "Agent by Status total",
    totalAgentsByStatus,
    "Agent by OS Type total",
    totalAgentsByOs,
  );

  const totalAlertsBySeverity = sumBy(data.alerts.alertBySeverity, (i) => i.count);
  const totalAlertsByStatus = sumBy(data.alerts.alertByStatus, (i) => i.count);
  assertEqual(
    "Alert by Severity total",
    totalAlertsBySeverity,
    "Alert by Status total",
    totalAlertsByStatus,
  );

  const totalCasesBySeverity = sumBy(data.cases.caseBySeverity, (i) => i.count);
  const totalCasesByStatus = sumBy(data.cases.caseByStatus, (i) => i.count);
  const totalCasesByTags = sumBy(data.cases.caseByIncidentTags, (i) => i.count);
  assertEqual(
    "Case by Severity total",
    totalCasesBySeverity,
    "Case by Status total",
    totalCasesByStatus,
  );
  assertEqual(
    "Case by Severity total",
    totalCasesBySeverity,
    "Case by Incident Tags total",
    totalCasesByTags,
  );
}

function assertEqual(labelA: string, a: number, labelB: string, b: number): void {
  if (a !== b) {
    throw new Error(
      `[mock data consistency] ${labelA} (${a}) !== ${labelB} (${b}). ` +
        "Fix the mock generator in src/mocks/generators.ts.",
    );
  }
}
