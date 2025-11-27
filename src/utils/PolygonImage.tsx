import { useRef, useCallback, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"
import { useOnInit } from "@hooks/hooks"
import { bear } from "@assets/index"

const DELAY_TIME = 500

export function PolygonMask() {
  const loaded = useRef(false)
  const [isLibraryReady, setIsLibraryReady] = useState(false)

  useOnInit(() => {
    if (loaded.current) return
    loaded.current = true

    initParticlesEngine(async (engine) => {
      await loadAll(engine) // carga plugins, shapes, presets, etc
      setIsLibraryReady(true)
    })
  })

  // eslint-disable-next-line
  const particlesLoaded = useCallback(async (container: any) => {
    if (container) {
      // 1. Inicia el motor en pausa (si autoPlay: false)
      container.pause()

      // 2. Espera el tiempo de retraso
      setTimeout(() => {
        // 3. ¡Arranca las partículas!
        container.play()
      }, DELAY_TIME)
    }
  }, [])

  // evitar error de particulas escapando su radio de actividad
  if (!isLibraryReady) {
    return null
  }

  return (
    <div style={{ width: "100%" }}>
      <Particles
        id="polygon-mask"
        particlesLoaded={particlesLoaded}
        options={{
          autoPlay: false,

          background: {
            color: {
              value: "#212121", // Fondo oscuro (casi negro)
            },
            opacity: 1,
          },

          // Mantener fullScreen en false para que ocupe el contenedor (esto es correcto)
          fullScreen: {
            enable: false,
          },

          fpsLimit: 120,

          // Configuración de interactividad (Simplificada, mantuve bubble)
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              bubble: {
                distance: 40,
                duration: 2,
                opacity: 8,
                size: 6,
              },
            },
          },

          // Configuración de las partículas (Simplificada)
          particles: {
            number: {
              value: 300,
            },
            color: {
              value: "#ffffff",
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: "none",
              outModes: "bounce", // default
            },
            opacity: {
              value: {
                min: 0.05,
                max: 0.4,
              },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            links: {
              distance: 14, // Corta distancia para efecto de "malla"
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 1,
            },
            // ZIndex default 0 (correcto)
          },

          // Configuración de Polygon Mask
          polygon: {
            draw: {
              enable: true,
              stroke: {
                color: {
                  value: "#fff",
                },
                width: 0.2,
                opacity: 0.8,
              },
            },
            enable: true,
            inline: {
              arrangement: "equidistant",
            },
            move: {
              radius: 5,
              type: "path",
            },
            scale: 1,
            type: "inline",
            url: bear,
            position: {
              x: 20,
              y: 0,
            },
          },
        }}
      />
    </div>
  )
}
