import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"
import { CatmullRomCurve3, DoubleSide, MeshStandardMaterial, NearestFilter, SRGBColorSpace, Vector3 } from "three"
import type { Group, Mesh } from "three"
import { ThrustParticles } from "./ThrustParticles"
import rocketUrl from "@assets/3d/simple_rocket.glb"
import rocketTextureUrl from "@assets/3d/rocket_diffuse.png"

// A loose, sweeping loop through the scene, pulled in much closer to the
// camera than the planet's depth layer so the ship actually reads as a
// ship and not a speck.
const WAYPOINTS: [number, number, number][] = [
  [-4, 1.8, -2],
  [-1, 2.6, -4],
  [2.5, 1.5, -2.5],
  [4, -0.5, -4],
  [2, -2.2, -1.5],
  [-1.5, -1.8, -3],
  [-4, 0, -2],
]

// Seconds per lap — slow on purpose, so the loop shape never quite reads as
// a loop within a normal page visit.
const PERIOD = 130

const CURVE = new CatmullRomCurve3(
  WAYPOINTS.map((p) => new Vector3(...p)),
  true,
  "catmullrom",
  0.5,
)

const MODEL_SCALE = 0.075
// model's native long axis is Y (~8.7 units), nose at +Y — rotate that onto
// local -Z so lookAt's forward convention points the nose along the curve
const MODEL_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0]
const TAIL_OFFSET: [number, number, number] = [0, 0, 0.3]

interface RocketProps {
  trailColor: string
}

/**
 * The glTF ships a real diffuse texture (a small flat-color swatch the UVs
 * sample per-face — red nose, grey body, cyan trim), but it's stored via the
 * deprecated `KHR_materials_pbrSpecularGlossiness` extension, which three.js's
 * GLTFLoader doesn't implement — it silently drops it, leaving a plain white
 * material with no map. That's why the ship read as colorless. Fixed by
 * extracting that same embedded image as a standalone asset
 * (rocket_diffuse.png) and applying it as `map` by hand, using the model's
 * own UVs — its real colors, not a themed substitute.
 *
 * The mesh also has inverted face winding (every visible triangle is a
 * backface) — `side: DoubleSide` fixes that without touching geometry.
 */
export function Rocket({ trailColor }: RocketProps) {
  const { scene } = useGLTF(rocketUrl)
  const texture = useTexture(rocketTextureUrl)
  const groupRef = useRef<Group>(null)
  const lookTarget = useMemo(() => new Vector3(), [])

  useEffect(() => {
    // the swatch is tiny (32x32, four flat color blocks) — nearest filtering
    // keeps each block a crisp flat color instead of bilinear-blurring them
    // together at the block edges
    texture.magFilter = NearestFilter
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true

    const material = new MeshStandardMaterial({ map: texture, roughness: 0.45, metalness: 0.2, side: DoubleSide })
    scene.traverse((obj) => {
      const mesh = obj as Mesh
      if (mesh.isMesh) mesh.material = material
    })
  }, [scene, texture])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = (state.clock.elapsedTime % PERIOD) / PERIOD
    const pos = CURVE.getPointAt(t)
    const tangent = CURVE.getTangentAt(t)
    groupRef.current.position.copy(pos)
    // nose-first: look toward where the curve is *going*, not where it came from
    lookTarget.copy(pos).sub(tangent)
    groupRef.current.lookAt(lookTarget)
  })

  return (
    <group ref={groupRef}>
      <group scale={MODEL_SCALE} rotation={MODEL_ROTATION}>
        <primitive object={scene} />
      </group>
      <ThrustParticles tailOffset={TAIL_OFFSET} color={trailColor} />
    </group>
  )
}

useGLTF.preload(rocketUrl)
