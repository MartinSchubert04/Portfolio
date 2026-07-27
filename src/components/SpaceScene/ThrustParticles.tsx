import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import type { Mesh } from "three"

const COUNT = 22
const LIFETIME = 0.7
const DRIFT_DISTANCE = 0.22
const JITTER = 0.022

// Generated once at module load, not during render (react-hooks' purity
// rule flags Math.random() in render/useMemo) — only one ThrustParticles
// instance exists in this scene, so a module-level seed array is fine.
const INITIAL_AGES = Array.from({ length: COUNT }, () => Math.random() * LIFETIME)

interface ThrustParticlesProps {
  /** local-space point at the ship's tail the particles stream from */
  tailOffset: [number, number, number]
  color: string
}

/**
 * A stream of small red dots spawning at the ship's tail and drifting
 * backward before recycling — cheap "thrust exhaust".
 *
 * This is rendered as a *child of the ship's own group* (see Rocket.tsx),
 * so it already inherits the ship's position/rotation through the normal
 * scene graph — these particle meshes only ever need LOCAL coordinates.
 * The previous version converted the local offset to world space by hand
 * (`ship.localToWorld`) and then assigned that to `mesh.position`, which
 * is itself interpreted as local-to-parent — applying the ship's transform
 * twice, which is why particles ended up scattered far from the ship
 * instead of trailing behind it.
 */
export function ThrustParticles({ tailOffset, color }: ThrustParticlesProps) {
  const meshRefs = useRef<(Mesh | null)[]>([])
  const ages = useRef([...INITIAL_AGES])
  const jitters = useRef(Array.from({ length: COUNT }, () => new Vector3()))
  const tail = useRef(new Vector3(...tailOffset))

  useFrame((_, delta) => {
    const t0 = tail.current

    for (let i = 0; i < COUNT; i++) {
      const mesh = meshRefs.current[i]
      if (!mesh) continue

      ages.current[i] += delta
      if (ages.current[i] > LIFETIME) {
        ages.current[i] = 0
        jitters.current[i].set((Math.random() - 0.5) * JITTER, (Math.random() - 0.5) * JITTER, 0)
      }
      const age = ages.current[i] / LIFETIME
      const j = jitters.current[i]

      mesh.position.set(t0.x + j.x, t0.y + j.y, t0.z + age * DRIFT_DISTANCE)
      const fade = 1 - age
      mesh.scale.setScalar(0.4 + fade * 0.6)
    }
  })

  return (
    <group>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el }} frustumCulled={false}>
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}
