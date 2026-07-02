export type CaseSeverity = "Critical" | "High" | "Medium" | "Low" | "Informational";

export type CaseStatus = "Close" | "In progress" | "New";

export type IncidentTag = "False positive" | "Suspicious" | "Incident";

export interface CaseBySeverityItem {
  severity: CaseSeverity;
  count: number;
}

export interface CaseByStatusItem {
  status: CaseStatus;
  count: number;
}

export interface CaseByAssigneeItem {
  assignee: string;
  count: number;
}

export interface CaseByIncidentTagItem {
  tag: IncidentTag;
  count: number;
}

export interface CasesWidgetsData {
  caseBySeverity: CaseBySeverityItem[];
  caseByStatus: CaseByStatusItem[];
  caseByAssignee: CaseByAssigneeItem[];
  caseByIncidentTags: CaseByIncidentTagItem[];
}
