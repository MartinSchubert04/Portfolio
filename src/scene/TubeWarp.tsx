import { useEffect, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"
import { Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial } from "three"
import { palette } from "./palette"

// How far the picture bulges. 0 is flat; the edge midpoints stay put and the corners pull in.
const CURVATURE = 0.22

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uScene;
  uniform vec3 uEdge;
  uniform float uCurvature;
  varying vec2 vUv;

  void main() {
    // Barrel distortion: sample further out the further the pixel is from the center, normalized
    // so the middle of each side maps onto itself and only the corners run off the picture.
    vec2 centered = vUv - 0.5;
    float r2 = dot(centered, centered);
    vec2 uv = 0.5 + centered * (1.0 + uCurvature * r2) / (1.0 + uCurvature * 0.25);
    bool inside = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0;
    gl_FragColor = inside ? texture2D(uScene, uv) : vec4(uEdge, 1.0);
    #include <colorspace_fragment>
  }
`

/**
 * The CRT tube curvature, done on the GPU: the scene is rendered into a texture and that texture
 * is drawn on one full-screen quad through a barrel-distortion shader. One extra draw call.
 *
 * It replaces a CSS/SVG displacement filter on the canvas, which the browser rasterizes on the CPU
 * for every frame of a full-screen WebGL canvas and made the whole page stutter.
 */
export function TubeWarp() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const target = useFBO({ samples: 4 })

  const quad = useMemo(() => {
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uScene: { value: target.texture },
        uEdge: { value: new Color(palette.hull) },
        uCurvature: { value: CURVATURE },
      },
      depthTest: false,
      depthWrite: false,
    })
    const mesh = new Mesh(new PlaneGeometry(2, 2), material)
    mesh.frustumCulled = false
    const quadScene = new Scene()
    quadScene.add(mesh)
    return { scene: quadScene, camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1), mesh, material }
  }, [target])

  useEffect(
    () => () => {
      quad.mesh.geometry.dispose()
      quad.material.dispose()
    },
    [quad],
  )

  // A positive priority takes over rendering from react-three-fiber: scene to texture, texture to screen
  useFrame(() => {
    gl.setRenderTarget(target)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
    gl.render(quad.scene, quad.camera)
  }, 1)

  return null
}
