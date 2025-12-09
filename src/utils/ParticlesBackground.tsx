import { useRef, useState, useEffect } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"
import { useOnInit } from "@hooks/hooks"

export function ParticleBackground() {
  const loaded = useRef(false)
  const [particleColor, setParticleColor] = useState("#3f3f46")

  useOnInit(() => {
    if (loaded.current) return
    loaded.current = true

    initParticlesEngine(async (engine) => {
      await loadAll(engine) // carga plugins, shapes, presets, etc
    })
  })

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

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      <Particles
        key={particleColor}
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
            color: { value: particleColor },
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
