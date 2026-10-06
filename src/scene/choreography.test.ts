import { describe, expect, it } from "vitest"
import { sections } from "@/data/site"
import { halfExtentAt, poseFor } from "./choreography"

describe("poseFor", () => {
  it("has a pose for every section, wide and narrow", () => {
    for (const { id } of sections) {
      expect(poseFor(id, false).astronaut.scale).toBeGreaterThan(0)
      expect(poseFor(id, true).astronaut.scale).toBeGreaterThan(0)
    }
  })

  it("keeps the astronaut on screen in every section", () => {
    for (const { id } of sections) {
      for (const narrow of [false, true]) {
        const { x, y } = poseFor(id, narrow).astronaut
        expect(Math.abs(x)).toBeLessThan(1)
        expect(Math.abs(y)).toBeLessThan(1)
      }
    }
  })

  it("shows the scene at full strength only where the layout leaves room for it", () => {
    expect(sections.filter(({ id }) => !poseFor(id, false).dim).map(({ id }) => id)).toEqual(["top", "contact"])
  })
})

describe("halfExtentAt", () => {
  it("shrinks the visible area as the depth gets closer to the camera", () => {
    expect(halfExtentAt(0, 8, 10, 6)).toEqual({ halfWidth: 5, halfHeight: 3 })
    expect(halfExtentAt(4, 8, 10, 6)).toEqual({ halfWidth: 2.5, halfHeight: 1.5 })
  })
})
