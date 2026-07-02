import { formatNumber } from "@/lib/formatters";

interface NumberCardProps {
  label: string;
  value: number;
  color: string;
}

export function NumberCard({ label, value, color }: NumberCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3.5 rounded-card border border-surface-border bg-surface-card px-6 py-6">
      <span className="text-lg font-bold capitalize text-white">{label}</span>
      <span className="text-3xl font-bold tabular-nums" style={{ color }}>
        {formatNumber(value)}
      </span>
    </div>
  );
}
