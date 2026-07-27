import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Points } from "three"

const COUNT = 900
const SPREAD = 30

/**
 * A plain THREE.Points starfield (no custom shader). drei's <Stars> bakes in
 * a vertex-shader trick (`vec4(position, 0.5)`) sized for a camera parked far
 * from the origin — with a close camera (this scene sits at z=8) the math
 * blows up point sizes to near-zero or, for one unlucky star, enormous. A
 * plain sizeAttenuation PointsMaterial has none of that baggage.
 *
 * The position array is built once at module load (not inside render/useMemo)
 * — react-hooks' purity rule flags Math.random() during render, and there's
 * only ever one Starfield on screen so a module-level constant is exactly
 * as correct and simpler than threading a seeded RNG through a memo.
 */
function buildStarPositions(count: number, spread: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = spread * (0.35 + 0.65 * Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
}

const STAR_POSITIONS = buildStarPositions(COUNT, SPREAD)

interface StarfieldProps {
  color?: string
}

export function Starfield({ color = "#ffffff" }: StarfieldProps) {
  const pointsRef = useRef<Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.006
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.055} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}
