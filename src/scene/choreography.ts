import type { SectionId } from "@/data/site"

/**
 * Where the astronaut and the globe sit for each section of the page.
 * x and y are fractions of half the visible width and height at the object's own depth:
 * 0 is the center, 1 is the right or top edge, values past 1 are off screen.
 */
export interface Placement {
  x: number
  y: number
  scale: number
}

export interface Pose {
  astronaut: Placement
  globe: Placement
  /** The scene steps back (lower opacity) while the section in front of it carries dense content. */
  dim: boolean
}

const WIDE: Record<SectionId, Pose> = {
  top: { astronaut: { x: 0.3, y: -0.12, scale: 1 }, globe: { x: 0.52, y: 0.06, scale: 1.5 }, dim: false },
  career: { astronaut: { x: 0.8, y: -0.45, scale: 0.8 }, globe: { x: 0.95, y: 1.15, scale: 1.2 }, dim: true },
  skills: { astronaut: { x: 0.6, y: 0.66, scale: 0.6 }, globe: { x: -1.15, y: -1.1, scale: 1.2 }, dim: true },
  projects: { astronaut: { x: 0.86, y: 0.5, scale: 0.7 }, globe: { x: 1.2, y: -1.1, scale: 1.2 }, dim: true },
  activity: { astronaut: { x: -0.82, y: -0.5, scale: 0.7 }, globe: { x: -1.15, y: 1.1, scale: 1.2 }, dim: true },
  // The globe comes back as a horizon under the astronaut
  contact: { astronaut: { x: 0.48, y: 0.18, scale: 1.1 }, globe: { x: 0.5, y: -1.38, scale: 3.2 }, dim: false },
}

// Portrait screens: one column of content, so the scene keeps to the lower half and stays smaller.
const NARROW: Record<SectionId, Pose> = {
  top: { astronaut: { x: 0.1, y: -0.52, scale: 0.6 }, globe: { x: 0.45, y: -0.5, scale: 0.75 }, dim: false },
  career: { astronaut: { x: 0.6, y: -0.7, scale: 0.5 }, globe: { x: 1.2, y: 1.2, scale: 0.7 }, dim: true },
  skills: { astronaut: { x: -0.6, y: 0.6, scale: 0.5 }, globe: { x: -1.3, y: -1.2, scale: 0.7 }, dim: true },
  projects: { astronaut: { x: 0.6, y: 0.6, scale: 0.5 }, globe: { x: 1.3, y: -1.2, scale: 0.7 }, dim: true },
  activity: { astronaut: { x: -0.6, y: -0.7, scale: 0.5 }, globe: { x: -1.3, y: 1.2, scale: 0.7 }, dim: true },
  contact: { astronaut: { x: 0.2, y: -0.42, scale: 0.6 }, globe: { x: 0, y: -1.3, scale: 1.5 }, dim: false },
}

export function poseFor(section: SectionId, narrow: boolean): Pose {
  return (narrow ? NARROW : WIDE)[section]
}

/** Half of the visible size at a given depth, for a camera at `cameraZ` looking down -z. */
export function halfExtentAt(z: number, cameraZ: number, viewportWidth: number, viewportHeight: number) {
  const factor = (cameraZ - z) / cameraZ
  return { halfWidth: (viewportWidth / 2) * factor, halfHeight: (viewportHeight / 2) * factor }
}

/** Frame-rate independent easing toward a target; `snap` jumps straight there (reduced motion). */
export function approach(current: number, target: number, lambda: number, delta: number, snap: boolean): number {
  if (snap) return target
  return current + (target - current) * (1 - Math.exp(-lambda * delta))
}
