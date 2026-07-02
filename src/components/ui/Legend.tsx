import { formatNumber } from "@/lib/formatters";

export interface LegendItem {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

export function Legend({ items }: { items: LegendItem[] }) {
  const showPercent = items.some((i) => i.percentage !== undefined);

  return (
    <div className="flex flex-col text-sm">
      {showPercent && (
        <div className="flex items-center justify-end gap-4 pb-1">
          <span className="w-12 text-right font-semibold text-primary">Value</span>
          <span className="w-14 text-right font-semibold text-primary">Percent</span>
        </div>
      )}
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex min-w-0 items-center justify-between gap-3 border-b border-white/5 py-1 first:border-t"
          >
            <span className="flex min-w-0 flex-1 items-center gap-2.5 text-white/80">
              <span
                className="h-3 w-5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-semibold">{item.label}</span>
            </span>
            <span className="flex shrink-0 justify-end gap-4">
              <span className="w-12 text-right tabular-nums text-white/80">
                {formatNumber(item.value)}
              </span>
              {item.percentage !== undefined && (
                <span className="w-14 text-right tabular-nums text-white/80">
                  {item.percentage.toFixed(0)}%
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
