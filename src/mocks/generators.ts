import { createRng, randomInt, splitTotal } from "@/lib/math";
import { generateTimeBuckets } from "@/lib/time";
import type {
  AgentByOsTypeItem,
  AgentByStatusItem,
  AgentOsType,
  AgentsWidgetsData,
  AlertByStatusItem,
  AlertBySeverityItem,
  AlertsWidgetsData,
  AlertStatus,
  CaseByAssigneeItem,
  CaseByIncidentTagItem,
  CaseByStatusItem,
  CaseBySeverityItem,
  CasesWidgetsData,
  CaseStatus,
  DashboardOverviewResponse,
  DetectionWidgetsData,
  EventsWidgetsData,
  IncidentTag,
  RuleLevelByTimePoint,
  TopAgentItem,
  TopTacticItem,
} from "@/types";

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const OS_TYPES: AgentOsType[] = ["Windows", "Linux", "CentOS", "RedHat", "Ubuntu"];
const OS_WEIGHTS = [0.45, 0.2, 0.15, 0.1, 0.1];

const ALERT_SEVERITY_WEIGHTS = [0.05, 0.15, 0.3, 0.3, 0.2] as const; // Critical..Information
const ALERT_STATUSES: AlertStatus[] = ["Escalated", "New", "Acknowledged"];
const ALERT_STATUS_WEIGHTS = [0.2, 0.5, 0.3];

const CASE_SEVERITY_WEIGHTS = [0.05, 0.15, 0.25, 0.35, 0.2] as const; // Critical..Informational
const CASE_STATUSES: CaseStatus[] = ["Close", "In progress", "New"];
const CASE_STATUS_WEIGHTS = [0.4, 0.35, 0.25];
const INCIDENT_TAGS: IncidentTag[] = ["False positive", "Suspicious", "Incident"];
const INCIDENT_TAG_WEIGHTS = [0.3, 0.4, 0.3];

const TACTICS = [
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact",
];

const TECHNIQUES = [
  "Phishing",
  "PowerShell",
  "Scheduled Task/Job",
  "Valid Accounts",
  "Process Injection",
  "OS Credential Dumping",
  "Remote Services",
  "Obfuscated Files or Information",
  "Ingress Tool Transfer",
  "Data Encrypted for Impact",
  "System Information Discovery",
  "Command and Scripting Interpreter",
];

const ASSIGNEES = [
  "Nguyen Van A",
  "Tran Thi B",
  "Le Van C",
  "Pham Thi D",
  "Hoang Van E",
  "Vu Thi F",
  "Dang Van G",
  "Bui Thi H",
  "Do Van I",
  "Ngo Thi K",
  "Duong Van L",
];

function topNDescending<T>(
  rng: () => number,
  names: string[],
  count: number,
  min: number,
  max: number,
  mapFn: (name: string, value: number) => T,
): T[] {
  const picked = [...names]
    .sort(() => rng() - 0.5)
    .slice(0, count)
    .map((name) => ({ name, value: randomInt(rng, min, max) }))
    .sort((a, b) => b.value - a.value);
  return picked.map((p) => mapFn(p.name, p.value));
}

function buildAgents(rng: () => number): AgentsWidgetsData {
  const totalAgents = randomInt(rng, 60, 220);
  const [online, offline] = splitTotal(totalAgents, [0.78, 0.22]);
  const agentByStatus: AgentByStatusItem[] = [
    { status: "Online", count: online },
    { status: "Offline", count: offline },
  ];

  const osCounts = splitTotal(totalAgents, OS_WEIGHTS);
  const agentByOsType: AgentByOsTypeItem[] = OS_TYPES.map((os, i) => ({
    os,
    count: osCounts[i],
  }));

  const agentNames = Array.from(
    { length: 24 },
    (_, i) => `AGT-${String(i + 1).padStart(3, "0")}`,
  );
  const topAgents: TopAgentItem[] = topNDescending(
    rng,
    agentNames,
    10,
    500,
    50000,
    (agentName, count) => ({ agentName, count }),
  );

  return { topAgents, agentByStatus, agentByOsType };
}

function buildEvents(rng: () => number, from: string, to: string): EventsWidgetsData {
  const buckets = generateTimeBuckets(from, to);
  const eventByTime = buckets.map((timestamp) => ({
    timestamp,
    count: randomInt(rng, 200, 15000),
  }));
  return { eventByTime };
}

function buildDetection(
  rng: () => number,
  from: string,
  to: string,
): DetectionWidgetsData {
  const tacticCounts = topNDescending(
    rng,
    TACTICS,
    10,
    5,
    400,
    (tactic, count) => ({ tactic, count }),
  );
  const tacticTotal = tacticCounts.reduce((sum, t) => sum + t.count, 0) || 1;
  const topTactics: TopTacticItem[] = tacticCounts.map((t) => ({
    ...t,
    percentage: Math.round((t.count / tacticTotal) * 1000) / 10,
  }));

  const ruleLevelByAttack = topNDescending(
    rng,
    TECHNIQUES,
    10,
    5,
    350,
    (technique, count) => ({ technique, count }),
  );

  const buckets = generateTimeBuckets(from, to);
  const ruleLevelByTime: RuleLevelByTimePoint[] = buckets.map((timestamp) => ({
    timestamp,
    Information: randomInt(rng, 5, 80),
    Low: randomInt(rng, 5, 120),
    Medium: randomInt(rng, 3, 90),
    High: randomInt(rng, 1, 50),
    Critical: randomInt(rng, 0, 20),
  }));

  return { topTactics, ruleLevelByAttack, ruleLevelByTime };
}

function buildAlerts(rng: () => number, from: string, to: string): AlertsWidgetsData {
  const totalAlerts = randomInt(rng, 200, 3000);
  const severityCounts = splitTotal(totalAlerts, [...ALERT_SEVERITY_WEIGHTS]);
  const alertBySeverity: AlertBySeverityItem[] = [
    { severity: "Critical", count: severityCounts[0] },
    { severity: "High", count: severityCounts[1] },
    { severity: "Medium", count: severityCounts[2] },
    { severity: "Low", count: severityCounts[3] },
    { severity: "Information", count: severityCounts[4] },
  ];

  const statusCounts = splitTotal(totalAlerts, ALERT_STATUS_WEIGHTS);
  const alertByStatus: AlertByStatusItem[] = ALERT_STATUSES.map((status, i) => ({
    status,
    count: statusCounts[i],
  }));

  const buckets = generateTimeBuckets(from, to);
  const timeWeights = buckets.map(() => rng());
  const timeCounts = splitTotal(totalAlerts, timeWeights);
  const alertByTime = buckets.map((timestamp, i) => ({
    timestamp,
    count: timeCounts[i],
  }));

  return { alertBySeverity, alertByStatus, alertByTime };
}

function buildCases(rng: () => number): CasesWidgetsData {
  const totalCases = randomInt(rng, 80, 900);

  const severityCounts = splitTotal(totalCases, [...CASE_SEVERITY_WEIGHTS]);
  const caseBySeverity: CaseBySeverityItem[] = [
    { severity: "Critical", count: severityCounts[0] },
    { severity: "High", count: severityCounts[1] },
    { severity: "Medium", count: severityCounts[2] },
    { severity: "Low", count: severityCounts[3] },
    { severity: "Informational", count: severityCounts[4] },
  ];

  const statusCounts = splitTotal(totalCases, CASE_STATUS_WEIGHTS);
  const caseByStatus: CaseByStatusItem[] = CASE_STATUSES.map((status, i) => ({
    status,
    count: statusCounts[i],
  }));

  const tagCounts = splitTotal(totalCases, INCIDENT_TAG_WEIGHTS);
  const caseByIncidentTags: CaseByIncidentTagItem[] = INCIDENT_TAGS.map((tag, i) => ({
    tag,
    count: tagCounts[i],
  }));

  const openCasesTotal = statusCounts[1] + statusCounts[2]; // In progress + New
  const caseByAssignee: CaseByAssigneeItem[] = topNDescending(
    rng,
    ASSIGNEES,
    Math.min(10, ASSIGNEES.length),
    1,
    Math.max(2, Math.floor(openCasesTotal / 3)),
    (assignee, count) => ({ assignee, count }),
  );

  return { caseBySeverity, caseByStatus, caseByAssignee, caseByIncidentTags };
}

export function buildDashboardOverview(from: string, to: string): DashboardOverviewResponse {
  const rng = createRng(hashSeed(`${from}|${to}`));
  return {
    agents: buildAgents(rng),
    events: buildEvents(rng, from, to),
    detection: buildDetection(rng, from, to),
    alerts: buildAlerts(rng, from, to),
    cases: buildCases(rng),
  };
}

export function buildEmptyDashboardOverview(): DashboardOverviewResponse {
  return {
    agents: { topAgents: [], agentByStatus: [], agentByOsType: [] },
    events: { eventByTime: [] },
    detection: { topTactics: [], ruleLevelByAttack: [], ruleLevelByTime: [] },
    alerts: { alertBySeverity: [], alertByStatus: [], alertByTime: [] },
    cases: {
      caseBySeverity: [],
      caseByStatus: [],
      caseByAssignee: [],
      caseByIncidentTags: [],
    },
  };
}
