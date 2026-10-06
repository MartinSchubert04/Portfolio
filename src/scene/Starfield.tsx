import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Points } from "three"
import { palette } from "./palette"

const COUNT = 900
const SPREAD = 30
// Every other layer sits at z >= -1.8, so stars at z <= -MIN_DEPTH are always the furthest thing back.
const MIN_DEPTH = 2

function buildStarPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = spread * (0.35 + 0.65 * Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - MIN_DEPTH
  }
  return positions
}

// Built once at module load: Math.random() is not allowed during render, and there is only one starfield.
const STAR_POSITIONS = buildStarPositions(COUNT, SPREAD)

export function Starfield() {
  const pointsRef = useRef<Points>(null)

  useFrame((_, delta) => {
    // Spinning around the view axis keeps every star at the depth it was given
    if (pointsRef.current) pointsRef.current.rotation.z += delta * 0.006
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial color={palette.frost} size={0.05} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  )
}
