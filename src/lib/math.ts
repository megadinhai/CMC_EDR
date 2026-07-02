/**
 * Splits `total` into integer parts proportional to `weights`, using the
 * largest-remainder method so the parts always sum to exactly `total`.
 * This is what keeps cross-widget totals identical (see mocks/validator.ts).
 */
export function splitTotal(total: number, weights: number[]): number[] {
  const weightSum = weights.reduce((a, b) => a + b, 0);
  if (weightSum <= 0 || total <= 0) {
    return weights.map(() => 0);
  }

  const raw = weights.map((w) => (w / weightSum) * total);
  const floors = raw.map(Math.floor);
  let remainder = total - floors.reduce((a, b) => a + b, 0);

  const order = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);

  const result = [...floors];
  for (let i = 0; i < order.length && remainder > 0; i++) {
    result[order[i].index] += 1;
    remainder--;
  }
  return result;
}

/** Mulberry32 seeded PRNG — deterministic so mock datasets are reproducible across reloads. */
export function createRng(seed: number): () => number {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}
