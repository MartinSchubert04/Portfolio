import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Trail, useGLTF, useTexture } from "@react-three/drei"
import {
  BufferGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Line,
  LineDashedMaterial,
  MeshStandardMaterial,
  NearestFilter,
  SRGBColorSpace,
  Vector3,
} from "three"
import type { Group, Mesh } from "three"
import rocketTextureUrl from "@/assets/3d/rocket_diffuse.png"
import rocketUrl from "@/assets/3d/simple_rocket.glb"
import { palette } from "./palette"

// A loose loop through the scene, in units of the visible half-width (x) and world units (y, z).
// z stays between the globe (0) and the astronaut (3.5), so the rocket passes behind one and in
// front of the other.
const WAYPOINTS: [number, number, number][] = [
  [-0.62, 0.99, 2.76],
  [-0.16, 1.43, 1.4],
  [0.39, 0.83, 2.42],
  [0.62, -0.28, 1.4],
  [0.31, -1.21, 3.1],
  [-0.23, -0.99, 2.08],
  [-0.62, 0, 2.76],
]

// Seconds per lap
const PERIOD = 75
const MODEL_SCALE = 0.05
// The model's nose points along +Y; rotate it onto -Z, the direction lookAt treats as forward
const MODEL_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0]
const TAIL_OFFSET: [number, number, number] = [0, 0, 0.1]

/**
 * The rocket flies a closed curve with a thrust trail, and the curve itself is drawn as a dashed
 * line: the flight plan sketched over the scene. Model: "simple rocket" by limine, CC BY 4.0.
 */
export function Rocket() {
  const { scene } = useGLTF(rocketUrl)
  const texture = useTexture(rocketTextureUrl)
  const groupRef = useRef<Group>(null)
  const tailRef = useRef<Group>(null!)
  const lookTarget = useMemo(() => new Vector3(), [])
  const { viewport } = useThree()
  const reach = viewport.width / 2
  // On portrait screens the rocket crosses the text column, so it is kept smaller there
  const size = viewport.width < viewport.height ? 0.6 : 1

  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        WAYPOINTS.map(([x, y, z]) => new Vector3(x * reach, y, z)),
        true,
        "catmullrom",
        0.5,
      ),
    [reach],
  )

  const flightPlan = useMemo(() => {
    const line = new Line(
      new BufferGeometry().setFromPoints(curve.getPoints(160)),
      new LineDashedMaterial({
        color: palette.mintDim,
        transparent: true,
        opacity: 0.3,
        dashSize: 0.08,
        gapSize: 0.08,
        depthWrite: false,
      }),
    )
    line.computeLineDistances()
    return line
  }, [curve])

  useEffect(
    () => () => {
      flightPlan.geometry.dispose()
      flightPlan.material.dispose()
    },
    [flightPlan],
  )

  useEffect(() => {
    // The file stores its colors through KHR_materials_pbrSpecularGlossiness, which three.js drops,
    // so the swatch texture is applied by hand. The mesh also has inverted winding (DoubleSide).
    const swatch = texture.clone()
    swatch.magFilter = NearestFilter
    swatch.colorSpace = SRGBColorSpace
    swatch.needsUpdate = true
    const clay = new MeshStandardMaterial({ map: swatch, roughness: 0.95, metalness: 0, side: DoubleSide })
    scene.traverse((object) => {
      const mesh = object as Mesh
      if (mesh.isMesh) mesh.material = clay
    })
    return () => {
      clay.dispose()
      swatch.dispose()
    }
  }, [scene, texture])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const t = (state.clock.elapsedTime % PERIOD) / PERIOD
    const position = curve.getPointAt(t)
    group.position.copy(position)
    // For a plain object lookAt points +Z at the target, and the nose sits on -Z: aim at the point
    // behind on the curve so the nose leads
    group.lookAt(lookTarget.copy(position).sub(curve.getTangentAt(t)))
  })

  return (
    <>
      <primitive object={flightPlan} />
      <group ref={groupRef} scale={size}>
        <group scale={MODEL_SCALE} rotation={MODEL_ROTATION}>
          <primitive object={scene} />
        </group>
        <group ref={tailRef} position={TAIL_OFFSET} />
        <mesh position={TAIL_OFFSET}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color={palette.thrust} toneMapped={false} />
        </mesh>
      </group>
      <Trail target={tailRef} width={0.16} length={3.5} decay={3} color={palette.thrust} attenuation={(t) => t * t} />
    </>
  )
}

useGLTF.preload(rocketUrl)
