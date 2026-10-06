import { Suspense, useEffect, useRef, type ReactNode } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MathUtils, type Group } from "three"
import type { SectionId } from "@/data/site"
import { Astronaut } from "./Astronaut"
import { poseFor } from "./choreography"
import { Globe } from "./Globe"
import { CAMERA_Z, palette } from "./palette"
import { Rocket } from "./Rocket"
import { Starfield } from "./Starfield"
import { TubeWarp } from "./TubeWarp"

interface SpaceSceneProps {
  section: SectionId
  /** No continuous motion: reduced-motion setting, or the visitor paused it from the status bar. */
  still: boolean
}

// Pointer position in -1..1, written by a window listener and read inside the render loop.
// It never goes through React state: that would re-render the tree on every mouse move.
const pointer = { x: 0, y: 0 }

/** Tilts everything a few degrees toward the pointer, so the scene has depth without being interactive. */
function ParallaxRig({ children }: { children: ReactNode }) {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y = MathUtils.damp(group.rotation.y, pointer.x * 0.05, 2, delta)
    group.rotation.x = MathUtils.damp(group.rotation.x, -pointer.y * 0.035, 2, delta)
  })

  return <group ref={groupRef}>{children}</group>
}

/** With the render loop on demand (motion off), a section change has to ask for its one frame. */
function RedrawOnSection({ section }: { section: SectionId }) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => invalidate(), [section, invalidate])
  return null
}

/**
 * Fixed, full-viewport, non-interactive backdrop: stars, a sketched globe, the rocket on its flight
 * plan and the astronaut. The page tells it which section is in view and it moves to that pose.
 */
export default function SpaceScene({ section, still }: SpaceSceneProps) {
  useEffect(() => {
    if (still) return
    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [still])

  return (
    <div className="scene" aria-hidden="true" data-dim={poseFor(section, false).dim}>
      <Canvas
        camera={{ position: [0, 0, CAMERA_Z], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.25]}
        // No tone mapping: the canvas is opaque and filled with the page color, and a tone curve
        // would shift that color away from the page around it.
        flat
        frameloop={still ? "demand" : "always"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[palette.hull]} />
        <fog attach="fog" args={[palette.hull, 9, 30]} />
        <hemisphereLight args={[palette.skyLight, palette.hull, 0.9]} />
        <directionalLight position={[-6, 5, 6]} intensity={2.2} color={palette.keyLight} />
        <directionalLight position={[6, -1, -4]} intensity={1.2} color={palette.mint} />

        <RedrawOnSection section={section} />
        <TubeWarp />
        <ParallaxRig>
          <Starfield />
          <Globe section={section} snap={still} />
          <Suspense fallback={null}>
            <Rocket />
          </Suspense>
          <Suspense fallback={null}>
            <Astronaut section={section} snap={still} />
          </Suspense>
        </ParallaxRig>
      </Canvas>
    </div>
  )
}
