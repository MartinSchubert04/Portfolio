import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { PlanetRig } from "./PlanetRig"
import { Starfield } from "./Starfield"
import { Rocket } from "./Rocket"
import { Spaceman } from "./Spaceman"
import { useThemeColors } from "./useThemeColors"
import "./SpaceScene.css"

const THRUST_RED = "#ff3b3b"

/**
 * Fixed, full-viewport, non-interactive 3D backdrop: starfield, a see-through
 * globe with real (reshaped) coastlines and two moons, a rocket slowly
 * looping a wide unnoticed path, and an astronaut floating near the camera.
 * Scene fog matches the page's own background color (not a new color) so
 * everything fades into the existing page instead of sitting on top of it.
 */
export const SpaceScene = () => {
  const colors = useThemeColors()

  return (
    <div className="space-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={[colors.background, 7, 28]} />

        <ambientLight intensity={0.28} />
        <pointLight position={[4, 3, 5]} intensity={0.8} color={colors.lightViolet} />
        <pointLight position={[-6, -2, -4]} intensity={0.2} color={colors.violet} />

        <Starfield color={colors.lightViolet} />

        <PlanetRig
          fillColor={colors.planetColor}
          gridColor={colors.violet}
          continentColor={colors.lightViolet}
          moonColor={colors.lightViolet}
          ringColor={colors.violet}
        />

        <Suspense fallback={null}>
          <Rocket trailColor={THRUST_RED} />
        </Suspense>

        <Suspense fallback={null}>
          <Spaceman x={-2.6} y={-0.6} z={3.5} scale={0.6} />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.3} luminanceThreshold={0.4} luminanceSmoothing={0.3} radius={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
