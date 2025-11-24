import { useEffect, useRef } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"

export function ParticleBackground() {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    initParticlesEngine(async (engine) => {
      await loadAll(engine) // carga plugins, shapes, presets, etc
    })
  }, [])

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: "var(--color-background)",
        },
        particles: {
          number: { value: 120 },
          move: { enable: true, speed: 0.5 },
          size: {
            value: {
              min: 0.1,
              max: 1.3,
            },
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 1,
              startValue: "random",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: {
              delay: 1,
              enable: true,
            },
          },
          modes: {
            bubble: {
              distance: 300,
              duration: 2,
              opacity: 0,
              size: 0,
            },
          },
        },
        color: { value: "#ffffff" },
        opacity: {
          value: 1,
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },

        pauseOnOutsideViewport: true,
        pauseOnBlur: true,
      }}
    />
  )
}
