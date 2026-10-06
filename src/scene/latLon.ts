/** lat/lon (degrees) to a point on a sphere of the given radius, three.js y-up. */
export function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180
  return [
    radius * Math.cos(latRad) * Math.cos(lonRad),
    radius * Math.sin(latRad),
    -radius * Math.cos(latRad) * Math.sin(lonRad),
  ]
}
