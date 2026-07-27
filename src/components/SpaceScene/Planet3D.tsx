import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Continents } from "./Continents"
import { Graticule } from "./Graticule"

interface Planet3DProps {
  fillColor: string
  gridColor: string
  continentColor: string
}

const RADIUS = 1.15

/** A see-through globe, like the space-station project's Earth view: a
 *  near-invisible fill (so stars show through and far-side coastlines are
 *  visible too, since depthWrite is off), a faint lat/lon grid, and real
 *  coastline data on top — not a solid lit sphere. */
export function Planet3D({ fillColor, gridColor, continentColor }: Planet3DProps) {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial color={fillColor} transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <Graticule radius={RADIUS} color={gridColor} />
      <Continents radius={RADIUS} color={continentColor} />
    </group>
  )
}
