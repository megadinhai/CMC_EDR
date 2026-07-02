import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-card border border-surface-border bg-surface-card shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
