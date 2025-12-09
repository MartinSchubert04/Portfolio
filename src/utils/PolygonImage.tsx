import { useRef, useCallback, useState, useEffect } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"
import { useOnInit } from "@hooks/hooks"
import { bear } from "@assets/index"

const DELAY_TIME = 50

export function PolygonMask() {
  const loaded = useRef(false)
  const [isLibraryReady, setIsLibraryReady] = useState(false)
  const [particleColor, setParticleColor] = useState("#3f3f46")

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue("--color-particles").trim() || "#ffffff"
      setParticleColor(color)
    }

    updateColor()

    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    })

    return () => observer.disconnect()
  }, [])

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
      container.pause()

      setTimeout(() => {
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
              value: particleColor,
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
              color: {
                value: particleColor,
              },
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
                  value: particleColor,
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
              y: -15,
            },
          },

          responsive: [
            {
              maxWidth: 700,
              options: {
                polygon: {
                  scale: 0.5, // 2. Centrar la posición para evitar que se salga del borde en pantallas pequeñas
                  position: {
                    x: 20, // Mover al 50% del ancho (centrado)
                    y: -10, // Mover al 50% de la altura (centrado)
                  },
                  move: {
                    radius: 1,
                    type: "path",
                  },
                },
                particles: {
                  number: {
                    value: 150,
                  },
                  color: {
                    value: particleColor,
                  },
                  move: {
                    enable: true,
                    speed: 0.1,
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
                    distance: 13, // Corta distancia para efecto de "malla"
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
              },
            },
          ],
        }}
      />
    </div>
  )
}
