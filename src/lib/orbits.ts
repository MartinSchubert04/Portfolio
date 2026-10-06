/** Geometry for the skills orbit map. Pure functions so the diagram can be tested without a DOM. */

export interface Orbit {
  rx: number
  ry: number
  /** Seconds per lap. Inner orbits are faster, following Kepler's third law (T² ∝ r³). */
  period: number
  /** Where on the lap the body starts, 0 to 1. */
  phase: number
}

/** Evenly spaced orbits between an inner and an outer radius, flattened to look tilted. */
export function buildOrbits(count: number, inner: number, outer: number, tilt: number, innerPeriod: number): Orbit[] {
  if (count <= 0) return []
  const step = count === 1 ? 0 : (outer - inner) / (count - 1)
  return Array.from({ length: count }, (_, i) => {
    const rx = inner + step * i
    return {
      rx,
      ry: rx * tilt,
      period: innerPeriod * Math.pow(rx / inner, 1.5),
      // Golden-angle spacing keeps the bodies from lining up on one side
      phase: (i * 0.618034) % 1,
    }
  })
}

/** Closed SVG path for an ellipse, starting at its rightmost point and running clockwise on screen. */
export function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy} Z`
}

/** Point on the ellipse at a lap fraction (0 = rightmost point, clockwise on screen). */
export function pointOnOrbit(cx: number, cy: number, orbit: Orbit, fraction: number): { x: number; y: number } {
  const angle = fraction * Math.PI * 2
  return { x: cx + orbit.rx * Math.cos(angle), y: cy + orbit.ry * Math.sin(angle) }
}
