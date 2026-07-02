import clsx from "clsx";
import { QUICK_RANGE_LABELS, QUICK_RANGE_PRESETS } from "@/lib/time";
import type { QuickRangePreset } from "@/types";

interface QuickRangeProps {
  active: QuickRangePreset;
  onSelect: (preset: QuickRangePreset) => void;
}

export function QuickRange({ active, onSelect }: QuickRangeProps) {
  return (
    <div className="flex flex-col gap-1 p-1">
      {QUICK_RANGE_PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onSelect(preset)}
          className={clsx(
            "rounded-md px-3 py-1.5 text-left text-sm transition-colors",
            preset === active
              ? "bg-severity-low/20 text-severity-low"
              : "text-slate-300 hover:bg-surface-muted",
          )}
        >
          {QUICK_RANGE_LABELS[preset]}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onSelect("custom")}
        className={clsx(
          "rounded-md px-3 py-1.5 text-left text-sm transition-colors",
          active === "custom"
            ? "bg-severity-low/20 text-severity-low"
            : "text-slate-300 hover:bg-surface-muted",
        )}
      >
        {QUICK_RANGE_LABELS.custom}
      </button>
    </div>
  );
}
