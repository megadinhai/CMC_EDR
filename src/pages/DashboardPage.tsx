import type { ReactNode } from "react";
import { TopAgentsWidget } from "@/features/agents/TopAgentsWidget";
import { AgentByStatusWidget } from "@/features/agents/AgentByStatusWidget";
import { AgentByOsTypeWidget } from "@/features/agents/AgentByOsTypeWidget";
import { EventByTimeWidget } from "@/features/events/EventByTimeWidget";
import { TopTacticsWidget } from "@/features/detection/TopTacticsWidget";
import { RuleLevelByAttackWidget } from "@/features/detection/RuleLevelByAttackWidget";
import { RuleLevelByTimeWidget } from "@/features/detection/RuleLevelByTimeWidget";
import { AlertBySeverityWidget } from "@/features/alerts/AlertBySeverityWidget";
import { AlertByStatusWidget } from "@/features/alerts/AlertByStatusWidget";
import { AlertByTimeWidget } from "@/features/alerts/AlertByTimeWidget";
import { CaseBySeverityWidget } from "@/features/cases/CaseBySeverityWidget";
import { CaseByStatusWidget } from "@/features/cases/CaseByStatusWidget";
import { CaseByAssigneeWidget } from "@/features/cases/CaseByAssigneeWidget";
import { CaseByIncidentTagsWidget } from "@/features/cases/CaseByIncidentTagsWidget";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <Section title="Agents">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TopAgentsWidget />
          <AgentByStatusWidget />
          <AgentByOsTypeWidget />
        </div>
      </Section>

      <Section title="Events">
        <EventByTimeWidget />
      </Section>

      <Section title="Detection engine">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopTacticsWidget />
            <RuleLevelByAttackWidget />
          </div>
          <RuleLevelByTimeWidget />
        </div>
      </Section>

      <Section title="Alert">
        <div className="flex flex-col gap-6">
          <AlertBySeverityWidget />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AlertByStatusWidget />
            <AlertByTimeWidget />
          </div>
        </div>
      </Section>

      <Section title="Case">
        <div className="flex flex-col gap-6">
          <CaseBySeverityWidget />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <CaseByStatusWidget />
            <CaseByAssigneeWidget />
            <CaseByIncidentTagsWidget />
          </div>
        </div>
      </Section>
    </div>
  );
}
