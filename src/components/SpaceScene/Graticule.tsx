import { useMemo } from "react"
import { Line } from "@react-three/drei"
import { latLonToVec3 } from "./latLon"

const SEGMENTS = 48

function meridian(lon: number, radius: number) {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= SEGMENTS; i++) pts.push(latLonToVec3(-90 + (180 * i) / SEGMENTS, lon, radius))
  return pts
}

function parallel(lat: number, radius: number) {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= SEGMENTS; i++) pts.push(latLonToVec3(lat, -180 + (360 * i) / SEGMENTS, radius))
  return pts
}

interface GraticuleProps {
  radius: number
  color: string
}

/** Faint lat/lon grid — reads as a globe even where there's no coastline nearby. */
export function Graticule({ radius, color }: GraticuleProps) {
  const meridians = useMemo(() => {
    const lines: [number, number, number][][] = []
    for (let lon = -180; lon < 180; lon += 30) lines.push(meridian(lon, radius))
    return lines
  }, [radius])

  const parallels = useMemo(() => {
    const lines: [number, number, number][][] = []
    for (let lat = -60; lat <= 60; lat += 30) lines.push(parallel(lat, radius))
    return lines
  }, [radius])

  return (
    <group>
      {meridians.map((pts, i) => (
        <Line key={`m${i}`} points={pts} color={color} transparent opacity={0.18} depthWrite={false} lineWidth={0.6} />
      ))}
      {parallels.map((pts, i) => (
        <Line key={`p${i}`} points={pts} color={color} transparent opacity={0.18} depthWrite={false} lineWidth={0.6} />
      ))}
    </group>
  )
}
