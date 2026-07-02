export type AgentStatus = "Online" | "Offline";

export type AgentOsType =
  | "Windows"
  | "Linux"
  | "CentOS"
  | "RedHat"
  | "Ubuntu";

export interface TopAgentItem {
  agentName: string;
  count: number;
}

export interface AgentByStatusItem {
  status: AgentStatus;
  count: number;
}

export interface AgentByOsTypeItem {
  os: AgentOsType;
  count: number;
}

export interface AgentsWidgetsData {
  topAgents: TopAgentItem[];
  agentByStatus: AgentByStatusItem[];
  agentByOsType: AgentByOsTypeItem[];
}
