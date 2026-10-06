import { useEffect, useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import {
  BufferGeometry,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  type Group,
  type Mesh,
  type Object3D,
} from "three"
import continents from "@/data/continents.json"
import type { SectionId } from "@/data/site"
import { approach, halfExtentAt, poseFor } from "./choreography"
import { latLonToVec3 } from "./latLon"
import { CAMERA_Z, palette } from "./palette"

const RADIUS = 1.15
const SEGMENTS = 48

/** Pushes a polyline into a flat array of segment pairs, the layout LineSegments expects. */
function pushPolyline(target: number[], points: [number, number, number][]) {
  for (let i = 0; i < points.length - 1; i++) target.push(...points[i], ...points[i + 1])
}

function segments(vertices: number[], color: string, opacity: number): LineSegments {
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3))
  return new LineSegments(geometry, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }))
}

function buildGraticule(): LineSegments {
  const vertices: number[] = []
  for (let lon = -180; lon < 180; lon += 30) {
    const meridian: [number, number, number][] = []
    for (let i = 0; i <= SEGMENTS; i++) meridian.push(latLonToVec3(-90 + (180 * i) / SEGMENTS, lon, RADIUS))
    pushPolyline(vertices, meridian)
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const parallel: [number, number, number][] = []
    for (let i = 0; i <= SEGMENTS; i++) parallel.push(latLonToVec3(lat, -180 + (360 * i) / SEGMENTS, RADIUS))
    pushPolyline(vertices, parallel)
  }
  return segments(vertices, palette.mintDim, 0.22)
}

// Real coastlines as [lon, lat] rings, the same file the space-station project draws its Earth with.
function buildCoastlines(): LineSegments {
  const vertices: number[] = []
  for (const ring of continents as [number, number][][]) {
    pushPolyline(
      vertices,
      ring.map(([lon, lat]) => latLonToVec3(lat, lon, RADIUS * 1.004)),
    )
  }
  return segments(vertices, palette.amber, 0.85)
}

function buildOrbitRing(radius: number): Line {
  const vertices: number[] = []
  for (let i = 0; i <= 96; i++) {
    const angle = (i / 96) * Math.PI * 2
    vertices.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3))
  const ring = new Line(
    geometry,
    new LineDashedMaterial({
      color: palette.mintDim,
      transparent: true,
      opacity: 0.5,
      dashSize: 0.07,
      gapSize: 0.06,
      depthWrite: false,
    }),
  )
  ring.computeLineDistances()
  return ring
}

const SATELLITE_COUNT = 280

// Points on shells just above the surface, like the satellite layer of the Earth view in the reference.
function buildSatellitePositions(): Float32Array {
  const positions = new Float32Array(SATELLITE_COUNT * 3)
  for (let i = 0; i < SATELLITE_COUNT; i++) {
    const r = RADIUS * (1.06 + 0.3 * Math.random() * Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  return positions
}

const SATELLITE_POSITIONS = buildSatellitePositions()

function disposeLines(objects: Object3D[]) {
  for (const object of objects) {
    const line = object as Line
    line.geometry.dispose()
    ;(line.material as LineBasicMaterial).dispose()
  }
}

interface MoonProps {
  radius: number
  speed: number
  tilt: number
  size: number
  color: string
  phase: number
}

/** A clay moon riding a dashed, tilted orbit. */
function Moon({ radius, speed, tilt, size, color, phase }: MoonProps) {
  const meshRef = useRef<Mesh>(null)
  const ring = useMemo(() => buildOrbitRing(radius), [radius])
  useEffect(() => () => disposeLines([ring]), [ring])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase
    meshRef.current?.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius)
  })

  return (
    <group rotation={[tilt, 0, 0]}>
      <primitive object={ring} />
      <mesh ref={meshRef} position={[Math.cos(phase) * radius, 0, Math.sin(phase) * radius]}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
    </group>
  )
}

interface GlobeProps {
  section: SectionId
  snap: boolean
}

/**
 * A sketched Earth: see-through fill, faint lat/lon grid, real coastlines in amber, a shell of
 * satellite points and two clay moons on dashed orbits. It moves to the pose of the current section.
 */
export function Globe({ section, snap }: GlobeProps) {
  const rigRef = useRef<Group>(null)
  const spinRef = useRef<Group>(null)
  const satellitesRef = useRef<Group>(null)
  const { viewport } = useThree()
  const narrow = viewport.width < viewport.height

  const graticule = useMemo(() => buildGraticule(), [])
  const coastlines = useMemo(() => buildCoastlines(), [])
  useEffect(() => () => disposeLines([graticule, coastlines]), [graticule, coastlines])

  useFrame((_, delta) => {
    const rig = rigRef.current
    if (!rig) return
    const { globe } = poseFor(section, narrow)
    const { halfWidth, halfHeight } = halfExtentAt(0, CAMERA_Z, viewport.width, viewport.height)
    const lambda = 1.6
    rig.position.x = approach(rig.position.x, globe.x * halfWidth, lambda, delta, snap)
    rig.position.y = approach(rig.position.y, globe.y * halfHeight, lambda, delta, snap)
    rig.scale.setScalar(approach(rig.scale.x, globe.scale, lambda, delta, snap))
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.05
    if (satellitesRef.current) satellitesRef.current.rotation.y += delta * 0.11
  })

  return (
    <group ref={rigRef} rotation={[0.32, -0.25, 0.08]}>
      <group ref={spinRef}>
        <mesh>
          <sphereGeometry args={[RADIUS, 48, 48]} />
          <meshBasicMaterial color={palette.hull} transparent opacity={0.55} depthWrite={false} />
        </mesh>
        <primitive object={graticule} />
        <primitive object={coastlines} />
      </group>
      <group ref={satellitesRef} rotation={[0.4, 0, 0.2]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[SATELLITE_POSITIONS, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={palette.mint}
            size={0.03}
            sizeAttenuation
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </points>
      </group>
      <Moon radius={1.65} speed={0.16} tilt={0.55} size={0.1} color={palette.frost} phase={0.6} />
      <Moon radius={2.1} speed={-0.1} tilt={-0.4} size={0.14} color={palette.amber} phase={2.4} />
    </group>
  )
}
