import { useThree } from "@react-three/fiber"
import { Planet3D } from "./Planet3D"
import { Moon3D } from "./Moon3D"

interface PlanetRigProps {
  fillColor: string
  gridColor: string
  continentColor: string
  moonColor: string
  ringColor: string
}

/**
 * Positions the planet+moons group using R3F's computed viewport (world units
 * visible at z=0), not a hardcoded x — a fixed world position works for one
 * aspect ratio and puts the whole thing off-screen on a phone-shaped canvas.
 *
 * Moon orbit tilts are a pure X-axis rotation at a moderate angle. A moon's
 * base path is already in the XZ plane (screen-horizontal by depth), so a
 * *steep* X tilt actually squashes it into a tall vertical loop with little
 * depth left — a *shallow* one barely rotates the ring at all and reads as
 * flat. A moderate ~25-35° keeps the ring looking like a wide ellipse while
 * still giving real depth travel, so the moon visibly dips behind the
 * planet on one side of its orbit instead of just circling around it.
 */
export function PlanetRig({ fillColor, gridColor, continentColor, moonColor, ringColor }: PlanetRigProps) {
  const { viewport } = useThree()
  const narrow = viewport.width < 5
  const scale = narrow ? 0.3 : 1
  const effectiveRadius = 1.35 * scale
  const x = narrow ? viewport.width / 2 - effectiveRadius * 0.15 : Math.max(viewport.width / 2 - effectiveRadius, effectiveRadius)
  const y = narrow ? 1.7 : 0.5 * scale

  return (
    <group position={[x, y, 0]} rotation={[0.08, -0.25, 0.05]} scale={scale}>
      <Planet3D fillColor={fillColor} gridColor={gridColor} continentColor={continentColor} />
      <Moon3D radius={2.0} speed={0.16} tilt={[0.55, 0, 0]} size={0.13} color={moonColor} ringColor={ringColor} />
      <Moon3D radius={2.8} speed={-0.1} tilt={[-0.4, 0, 0]} size={0.19} color={ringColor} ringColor={ringColor} phase={2} />
    </group>
  )
}
