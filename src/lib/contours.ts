// Generates smooth, wobbly closed paths that read like depth contours
// on a nautical chart. Deterministic, so builds are stable.

type Opts = {
  cx: number;
  cy: number;
  rings: number;
  r0: number;
  step: number;
  squash?: number;
  seed?: number;
  points?: number;
};

function smoothClosed(pts: [number, number][]): string {
  // Catmull-Rom to cubic Bezier, closed.
  const n = pts.length;
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

export function contours({ cx, cy, rings, r0, step, squash = 0.8, seed = 1, points = 18 }: Opts): string[] {
  const out: string[] = [];
  for (let k = 0; k < rings; k++) {
    const r = r0 + k * step;
    const pts: [number, number][] = [];
    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      const wobble =
        1 +
        0.13 * Math.sin(3 * a + seed + k * 0.35) +
        0.07 * Math.sin(5 * a + seed * 2.1 - k * 0.2) +
        0.04 * Math.cos(7 * a + seed * 0.7);
      pts.push([cx + Math.cos(a) * r * wobble, cy + Math.sin(a) * r * wobble * squash]);
    }
    out.push(smoothClosed(pts));
  }
  return out;
}
