import { useEffect, useRef, useState } from "react";
import { QuickRange } from "./QuickRange";
import { QUICK_RANGE_LABELS } from "@/lib/time";
import {
  useSetCustomRange,
  useSetPresetRange,
  useTimeRange,
} from "@/store/useDashboardStore";
import type { QuickRangePreset } from "@/types";

function toLocalInputValue(iso: string): string {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], { month: "short", day: "numeric" });
}

export function DateTimePicker() {
  const timeRange = useTimeRange();
  const setPresetRange = useSetPresetRange();
  const setCustomRange = useSetCustomRange();

  const [open, setOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(() => toLocalInputValue(timeRange.from));
  const [draftTo, setDraftTo] = useState(() => toLocalInputValue(timeRange.to));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handlePresetSelect(preset: QuickRangePreset) {
    if (preset === "custom") {
      setDraftFrom(toLocalInputValue(timeRange.from));
      setDraftTo(toLocalInputValue(timeRange.to));
      return;
    }
    setPresetRange(preset);
    setOpen(false);
  }

  function handleApplyCustom() {
    setCustomRange(new Date(draftFrom).toISOString(), new Date(draftTo).toISOString());
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={QUICK_RANGE_LABELS[timeRange.preset]}
        className="flex h-10 w-[280px] items-center gap-2.5 rounded-[5px] border border-white/20 bg-white/[0.03] px-4 text-sm font-semibold text-white/80 hover:border-white/40"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 7v5l3 2" />
        </svg>
        <span className="truncate">{formatShortDate(timeRange.from)}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="truncate">{formatShortDate(timeRange.to)}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-surface-border bg-surface-card shadow-card">
          <QuickRange active={timeRange.preset} onSelect={handlePresetSelect} />
          <div className="border-t border-surface-border p-3">
            <p className="mb-2 text-xs font-medium text-slate-400">Custom range</p>
            <div className="flex flex-col gap-2">
              <input
                type="datetime-local"
                value={draftFrom}
                onChange={(e) => setDraftFrom(e.target.value)}
                className="rounded-md border border-surface-border bg-surface-muted px-2 py-1 text-xs text-slate-200"
              />
              <input
                type="datetime-local"
                value={draftTo}
                onChange={(e) => setDraftTo(e.target.value)}
                className="rounded-md border border-surface-border bg-surface-muted px-2 py-1 text-xs text-slate-200"
              />
              <button
                type="button"
                onClick={handleApplyCustom}
                className="rounded-md bg-severity-low px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
