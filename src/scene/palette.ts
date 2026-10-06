// three.js cannot read CSS custom properties, so the scene keeps its own copy of the tokens it uses.
// Same values as @theme in src/index.css and the table in DESIGN.md section 2.
export const palette = {
  hull: "#0b110f",
  frost: "#d9efe7",
  mint: "#5cf2cb",
  mintDim: "#2bb892",
  amber: "#ffb02e",
  thrust: "#ff5a4d",
  // Clay lighting: a warm key, a pale sky fill and a mint rim
  keyLight: "#ffe6bf",
  skyLight: "#cdeee3",
}

export const CAMERA_Z = 8
// Depth layers, back to front: stars (z <= -2), globe (0), rocket (1.4 to 3.1), astronaut (3.5)
export const ASTRONAUT_Z = 3.5
