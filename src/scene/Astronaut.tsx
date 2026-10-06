import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"
import { LoopRepeat, MeshStandardMaterial } from "three"
import type { Group, Mesh, MeshBasicMaterial } from "three"
import spacemanUrl from "@/assets/3d/spaceman.glb"
import type { SectionId } from "@/data/site"
import { approach, halfExtentAt, poseFor } from "./choreography"
import { ASTRONAUT_Z, CAMERA_Z } from "./palette"

// Model size at scale 1 of the choreography
const BASE_SCALE = 0.6
const ROLL = Math.PI * 0.82

interface AstronautProps {
  section: SectionId
  snap: boolean
}

/**
 * The floating astronaut, the closest object to the camera. It drifts to the pose of the current
 * section and bobs in place. Model: "Tenhun Falling spaceman (FanArt)" by wallmasterr, CC BY 4.0.
 */
export function Astronaut({ section, snap }: AstronautProps) {
  const { scene, animations } = useGLTF(spacemanUrl)
  const groupRef = useRef<Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const { viewport } = useThree()
  const narrow = viewport.width < viewport.height

  useEffect(() => {
    // The file's material is unlit (KHR_materials_unlit), so no light reaches it. A fully rough
    // standard material with the same texture keeps the original colors and gives the matte,
    // soft-shadowed surface of clay.
    const clay = new MeshStandardMaterial({ roughness: 1, metalness: 0 })
    scene.traverse((object) => {
      const mesh = object as Mesh
      if (!mesh.isMesh) return
      clay.map = (mesh.material as MeshBasicMaterial).map
      mesh.material = clay
    })
    return () => clay.dispose()
  }, [scene])

  useEffect(() => {
    // Without its one clip the rigged model stands in a T-pose. No fade-in, for the same reason.
    const idle = actions.Idle
    idle?.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).play()
    return () => {
      idle?.stop()
    }
  }, [actions])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const { astronaut } = poseFor(section, narrow)
    const { halfWidth, halfHeight } = halfExtentAt(ASTRONAUT_Z, CAMERA_Z, viewport.width, viewport.height)
    const time = state.clock.elapsedTime
    const lambda = 1.4
    const bob = snap ? 0 : Math.sin(time * 0.4) * 0.1
    group.position.x = approach(group.position.x, astronaut.x * halfWidth, lambda, delta, snap)
    group.position.y = approach(group.position.y, astronaut.y * halfHeight + bob, lambda, delta, snap)
    group.scale.setScalar(approach(group.scale.x, astronaut.scale * BASE_SCALE, lambda, delta, snap))
    // The model faces away from the camera by default; turn it around and let it sway
    group.rotation.y = Math.PI - 0.2 + Math.sin(time * 0.18) * 0.25
    // The idle clip is a head-first fall; rolled most of the way over it reads as floating instead
    group.rotation.z = ROLL + Math.sin(time * 0.13) * 0.12
  })

  return (
    <group ref={groupRef} position={[0, 0, ASTRONAUT_Z]} scale={BASE_SCALE}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(spacemanUrl)
