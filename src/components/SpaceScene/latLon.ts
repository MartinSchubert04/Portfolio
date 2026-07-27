/** lat/lon (degrees) -> point on a sphere of the given radius, three.js y-up. */
export function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180
  const x = radius * Math.cos(latRad) * Math.cos(lonRad)
  const y = radius * Math.sin(latRad)
  const z = -radius * Math.cos(latRad) * Math.sin(lonRad)
  return [x, y, z]
}
