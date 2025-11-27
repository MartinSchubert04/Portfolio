import { useRef } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"
import { useOnInit } from "@hooks/hooks"

export function ParticleBackground() {
  const loaded = useRef(false)

  useOnInit(() => {
    if (loaded.current) return
    loaded.current = true

    initParticlesEngine(async (engine) => {
      await loadAll(engine) // carga plugins, shapes, presets, etc
    })
  })

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      <Particles
        id="tsparticles"
        options={{
          particles: {
            number: { value: 150 },
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
    </div>
  )
}
