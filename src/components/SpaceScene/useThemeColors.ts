import { useEffect, useState } from "react"

/**
 * Resolves theme CSS custom properties to real color strings THREE.Color
 * can parse. Reading a custom property directly (getPropertyValue) returns
 * its raw authored text, which for --color-violet is
 * "rgb(163 116 255 / var(--tw-text-opacity))" — still containing an
 * unresolved nested var(), so it can't be handed to three.js as-is. Applying
 * it to a throwaway element's `color` and reading that back gives the fully
 * resolved "rgb(r, g, b)" value instead.
 */
function resolveColorVar(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback
  const probe = document.createElement("div")
  probe.style.color = `var(${varName})`
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  document.body.removeChild(probe)
  return resolved || fallback
}

/** Mixes a resolved rgb(...) string toward black so scene objects sit dimmer
 *  against the page instead of popping out at full brand saturation. */
function darken(rgbString: string, factor: number): string {
  const match = rgbString.match(/rgba?\(([^)]+)\)/)
  if (!match) return rgbString
  const [r, g, b] = match[1].split(",").map((s) => parseFloat(s))
  return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`
}

function readThemeColors() {
  const backgroundItem = resolveColorVar("--color-background-item", "#ab66fd")
  const lightViolet = resolveColorVar("--color-light-violet", "#e7d2f9")
  return {
    violet: resolveColorVar("--color-violet", "#a374ff"),
    lightViolet,
    backgroundItem,
    planetColor: darken(backgroundItem, 0.42),
    background: resolveColorVar("--color-background", "#212121"),
  }
}

export function useThemeColors() {
  const [colors, setColors] = useState(readThemeColors)

  useEffect(() => {
    const update = () => setColors(readThemeColors())
    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return colors
}
