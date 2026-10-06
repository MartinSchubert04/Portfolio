import { describe, expect, it } from "vitest"
import { buildOrbits, ellipsePath, pointOnOrbit } from "./orbits"

describe("buildOrbits", () => {
  it("spaces the orbits evenly from inner to outer", () => {
    const orbits = buildOrbits(3, 100, 300, 0.5, 30)
    expect(orbits.map((o) => o.rx)).toEqual([100, 200, 300])
    expect(orbits.map((o) => o.ry)).toEqual([50, 100, 150])
  })

  it("makes outer orbits slower by Kepler's third law", () => {
    const [inner, outer] = buildOrbits(2, 100, 400, 0.5, 30)
    expect(inner.period).toBe(30)
    expect(outer.period).toBeCloseTo(240) // (400 / 100) ^ 1.5 = 8
  })

  it("handles one orbit and none", () => {
    expect(buildOrbits(1, 100, 300, 0.5, 30)[0].rx).toBe(100)
    expect(buildOrbits(0, 100, 300, 0.5, 30)).toEqual([])
  })
})

describe("ellipsePath", () => {
  it("starts at the rightmost point and closes", () => {
    expect(ellipsePath(0, 0, 10, 5)).toBe("M 10 0 A 10 5 0 1 1 -10 0 A 10 5 0 1 1 10 0 Z")
  })
})

describe("pointOnOrbit", () => {
  it("walks the ellipse clockwise on screen", () => {
    const orbit = buildOrbits(1, 100, 100, 0.5, 30)[0]
    expect(pointOnOrbit(0, 0, orbit, 0)).toEqual({ x: 100, y: 0 })
    const quarter = pointOnOrbit(0, 0, orbit, 0.25)
    expect(quarter.x).toBeCloseTo(0)
    expect(quarter.y).toBeCloseTo(50)
  })
})
