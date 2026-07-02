import { create } from "zustand";
import { buildTimeRange, defaultTimeRange } from "@/lib/time";
import type { QuickRangePreset, TimeRange } from "@/types";

/**
 * Holds only UI/filter state shared across the page. Widget data itself
 * lives in React Query's cache (see api/hooks.ts) — Zustand never stores
 * server data, so there is exactly one source of truth per concern and no
 * risk of the two getting out of sync.
 */
interface DashboardStore {
  timeRange: TimeRange;
  setPresetRange: (preset: QuickRangePreset) => void;
  setCustomRange: (from: string, to: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  timeRange: defaultTimeRange(new Date()),

  setPresetRange: (preset) =>
    set({ timeRange: buildTimeRange(preset, new Date()) }),

  setCustomRange: (from, to) =>
    set({ timeRange: { preset: "custom", from, to } }),
}));

// Granular selectors avoid re-rendering subscribers when unrelated store
// fields change (there's only one field today, but this keeps the pattern
// consistent as the store grows).
export const useTimeRange = () => useDashboardStore((s) => s.timeRange);
export const useSetPresetRange = () => useDashboardStore((s) => s.setPresetRange);
export const useSetCustomRange = () => useDashboardStore((s) => s.setCustomRange);
