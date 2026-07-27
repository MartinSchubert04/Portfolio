import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"
import { LoopRepeat } from "three"
import type { Group } from "three"
import spacemanUrl from "@assets/3d/spaceman.glb"

interface SpacemanProps {
  x: number
  y: number
  z: number
  scale: number
}

/**
 * Floating astronaut near the camera, off to the left, in its original
 * stock colors. The glTF carries one embedded clip ("Idle") — without
 * playing it, a rigged/skinned model just sits in its bind pose, which is
 * the classic T-pose.
 */
export function Spaceman({ x, y, z, scale }: SpacemanProps) {
  const { scene, animations } = useGLTF(spacemanUrl)
  const groupRef = useRef<Group>(null)
  const { actions } = useAnimations(animations, groupRef)
  const { viewport } = useThree()

  const narrow = viewport.width < 5
  const effScale = narrow ? scale * 0.55 : scale
  const effX = narrow ? -1.1 : x
  const effY = narrow ? y + 0.7 : y

  useEffect(() => {
    const idle = actions.Idle
    // no fadeIn: fading blends from weight 0 (bind pose / T-pose) up to the
    // clip over time, so the figure visibly snaps out of a T-pose as it
    // ramps up — setting weight straight to 1 makes it start already in
    // the animated pose, frame one.
    idle?.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).play()
    return () => {
      idle?.stop()
    }
  }, [actions])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y = effY + Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    // model's front faces away from camera by default — flip 180° so it
    // faces the viewer instead of showing its back
    groupRef.current.rotation.y = Math.PI - 0.2 + Math.sin(state.clock.elapsedTime * 0.18) * 0.25
  })

  return (
    <group ref={groupRef} position={[effX, effY, z]} scale={effScale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(spacemanUrl)
