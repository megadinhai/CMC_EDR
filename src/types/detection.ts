import type { Severity } from "./common";

export interface TopTacticItem {
  tactic: string;
  count: number;
  percentage: number;
}

export interface RuleLevelByAttackItem {
  technique: string;
  count: number;
}

export type RuleLevel = Severity;

export interface RuleLevelByTimePoint {
  [key: string]: string | number;
  timestamp: string;
  Information: number;
  Low: number;
  Medium: number;
  High: number;
  Critical: number;
}

export interface DetectionWidgetsData {
  topTactics: TopTacticItem[];
  ruleLevelByAttack: RuleLevelByAttackItem[];
  ruleLevelByTime: RuleLevelByTimePoint[];
}
