/** Compacts large numbers for chart labels/cards: 950 -> "950", 1200 -> "1.2k", 3400000 -> "3.4M". */
export function formatNumber(n: number): string {
  const abs = Math.abs(n);
  if (abs < 1000) return String(n);

  const units: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "k"],
  ];

  for (const [threshold, suffix] of units) {
    if (abs >= threshold) {
      const value = n / threshold;
      const formatted =
        value >= 100 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "");
      return `${formatted}${suffix}`;
    }
  }

  return String(n);
}

export function formatPercentage(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function sumBy<T>(items: T[], selector: (item: T) => number): number {
  return items.reduce((total, item) => total + selector(item), 0);
}
