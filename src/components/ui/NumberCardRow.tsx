import { Card } from "./Card";
import { WidgetSkeleton } from "./Skeleton";
import { NoData } from "./NoData";
import { ErrorState } from "./ErrorState";
import { NumberCard } from "@/components/charts";
import type { WidgetStatus } from "@/types";

interface NumberCardRowProps {
  status: WidgetStatus;
  cards: { label: string; value: number; color: string }[];
}

/**
 * Severity number-card rows in Figma render as N standalone bordered cards
 * with no wrapping titled container — unlike every other widget. This
 * collapses to one full-width Card for the loading/error/no-data states,
 * since a single row shares one query result.
 */
export function NumberCardRow({ status, cards }: NumberCardRowProps) {
  if (status !== "ready") {
    return (
      <Card>
        {status === "loading" && <WidgetSkeleton />}
        {status === "no-data" && <NoData />}
        {status === "error" && <ErrorState />}
      </Card>
    );
  }

  return (
    <div className="flex gap-6">
      {cards.map((card) => (
        <NumberCard key={card.label} label={card.label} value={card.value} color={card.color} />
      ))}
    </div>
  );
}
