import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import type { Mesh } from "three"

interface Moon3DProps {
  radius: number
  speed: number
  tilt: [number, number, number]
  size: number
  color: string
  ringColor: string
  phase?: number
}

/** A moon riding a dashed, tilted orbit ring around the planet at the group's origin. */
export function Moon3D({ radius, speed, tilt, size, color, ringColor, phase = 0 }: Moon3DProps) {
  const meshRef = useRef<Mesh>(null)

  const ringPoints = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius])
    }
    return pts
  }, [radius])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed + phase
    meshRef.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius)
  })

  return (
    <group rotation={tilt}>
      <Line points={ringPoints} color={ringColor} transparent opacity={0.35} dashed dashSize={0.06} gapSize={0.05} depthWrite={false} />
      <mesh ref={meshRef} renderOrder={1}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.08}
          roughness={0.8}
          depthTest
          depthWrite
        />
      </mesh>
    </group>
  )
}
