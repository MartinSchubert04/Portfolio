import { useMemo } from "react"
import { Line } from "@react-three/drei"
import { latLonToVec3 } from "./latLon"

interface ContinentSeed {
  lon: number
  lat: number
  /** base landmass radius, in degrees */
  baseRadius: number
  /** elongation along the seed's local x-axis before rotation */
  aspect: number
  /** rotation of the elongation axis, radians */
  rotation: number
}

// Hand-placed like a fantasy-map layout (not a projection of any real
// coastline) — a few large landmasses plus a couple of smaller ones, spread
// around the sphere so the globe never reads as empty from any angle.
const CONTINENT_SEEDS: ContinentSeed[] = [
  { lon: -45, lat: 20, baseRadius: 27, aspect: 1.7, rotation: 0.5 },
  { lon: 55, lat: -12, baseRadius: 21, aspect: 2.3, rotation: -0.7 },
  { lon: 155, lat: 28, baseRadius: 15, aspect: 1.35, rotation: 1.1 },
  { lon: -115, lat: -38, baseRadius: 17, aspect: 1.9, rotation: -1.2 },
  { lon: 5, lat: 58, baseRadius: 12, aspect: 1.5, rotation: 0.85 },
  { lon: -155, lat: 5, baseRadius: 9, aspect: 1.6, rotation: -0.3 },
]

const RING_POINTS = 72
// irregular integer frequencies so the perturbation never repeats in a
// visibly regular (i.e. "too straight/polygonal") pattern
const HARMONICS = [2, 3, 5, 7]
const HARMONIC_BASE_AMP = [0.24, 0.14, 0.09, 0.05]

// Randomized once at module load (not per-render — react-hooks' purity rule
// forbids Math.random() in render/useMemo), one phase + amplitude jitter set
// per continent seed per harmonic. This is what keeps every landmass'
// coastline irregular — bays and peninsulas from the higher frequencies,
// overall shape from the lower ones — instead of a smooth blob (too little
// variation) or a low-vertex, obviously-straight-edged polygon (too much,
// too regular).
const SEED_HARMONICS = CONTINENT_SEEDS.map(() =>
  HARMONICS.map((freq, i) => ({
    freq,
    amp: HARMONIC_BASE_AMP[i] * (0.75 + Math.random() * 0.5),
    phase: Math.random() * Math.PI * 2,
  })),
)

function coastlineRadius(theta: number, seedIndex: number, baseRadius: number): number {
  let factor = 1
  for (const h of SEED_HARMONICS[seedIndex]) factor += h.amp * Math.sin(h.freq * theta + h.phase)
  return baseRadius * factor
}

function buildRing(seed: ContinentSeed, seedIndex: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = []
  const cosLat = Math.max(0.15, Math.cos((seed.lat * Math.PI) / 180))
  const cosRot = Math.cos(seed.rotation)
  const sinRot = Math.sin(seed.rotation)

  for (let i = 0; i <= RING_POINTS; i++) {
    const theta = (i / RING_POINTS) * Math.PI * 2
    const r = coastlineRadius(theta, seedIndex, seed.baseRadius)
    // unit circle point, stretched along local x for elongation, then
    // rotated so the elongation axis isn't always pointing the same way
    const ex = Math.cos(theta) * r * seed.aspect
    const ey = Math.sin(theta) * r
    const dx = ex * cosRot - ey * sinRot
    const dy = ex * sinRot + ey * cosRot

    const lon = seed.lon + dx / cosLat
    const lat = Math.max(-85, Math.min(85, seed.lat + dy))
    points.push(latLonToVec3(lat, lon, radius))
  }
  return points
}

interface ContinentsProps {
  radius: number
  color: string
}

/** Invented, fantasy-map-style landmasses — not a reshaped Earth. */
export function Continents({ radius, color }: ContinentsProps) {
  const outlines = useMemo(
    () => CONTINENT_SEEDS.map((seed, i) => buildRing(seed, i, radius * 1.004)),
    [radius],
  )

  return (
    <group>
      {outlines.map((points, i) => (
        <Line key={i} points={points} color={color} transparent opacity={0.75} depthWrite={false} lineWidth={1} />
      ))}
    </group>
  )
}
