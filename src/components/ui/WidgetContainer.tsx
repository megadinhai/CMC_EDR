import type { ReactNode } from "react";
import { Card } from "./Card";
import { WidgetSkeleton } from "./Skeleton";
import { NoData } from "./NoData";
import { ErrorState } from "./ErrorState";
import type { WidgetStatus } from "@/types";

export type { WidgetStatus };

interface WidgetContainerProps {
  title: string;
  status: WidgetStatus;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  errorMessage?: string;
}

export function WidgetContainer({
  title,
  status,
  children,
  className,
  bodyClassName,
  errorMessage,
}: WidgetContainerProps) {
  return (
    <Card className={className}>
      <div className="flex h-full flex-col p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <div className={bodyClassName ?? "flex-1"}>
          {status === "loading" && <WidgetSkeleton />}
          {status === "no-data" && <NoData />}
          {status === "error" && <ErrorState message={errorMessage} />}
          {status === "ready" && children}
        </div>
      </div>
    </Card>
  );
}
