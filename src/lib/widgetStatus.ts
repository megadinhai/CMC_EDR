import type { WidgetStatus } from "@/types";

/** Maps a React Query result + an emptiness check to the widget's display state (BA spec 4.3). */
export function resolveWidgetStatus(
  isLoading: boolean,
  isError: boolean,
  isEmpty: boolean,
): WidgetStatus {
  if (isLoading) return "loading";
  if (isError) return "error";
  if (isEmpty) return "no-data";
  return "ready";
}
