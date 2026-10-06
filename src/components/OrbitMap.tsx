import { skillGroups } from "@/data/skills"
import { buildOrbits, ellipsePath, pointOnOrbit } from "@/lib/orbits"

const WIDTH = 720
const HEIGHT = 460
const CX = WIDTH / 2
const CY = HEIGHT / 2 + 14
const ORBITS = buildOrbits(skillGroups.length, 72, 344, 0.6, 28)

interface OrbitMapProps {
  selected: number
  onSelect: (index: number) => void
  animate: boolean
}

/**
 * The heliocentric view of the reference, used as a picker: one orbit per skill group. Orbits are
 * the sketch material (dashed, wobbled), bodies are clay. The map is a mouse shortcut for the tab
 * list next to it, so it is hidden from assistive technology.
 */
export function OrbitMap({ selected, onSelect, animate }: OrbitMapProps) {
  const orbit = ORBITS[selected]
  const group = skillGroups[selected]
  // The callout points at the top of the selected orbit
  const anchor = { x: CX - orbit.rx * 0.5, y: CY - orbit.ry * Math.sin(Math.acos(0.5)) }

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="clay-sun" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--color-amber-hi)" />
          <stop offset="55%" stopColor="var(--color-amber)" />
          <stop offset="100%" stopColor="var(--color-amber-lo)" />
        </radialGradient>
        <radialGradient id="clay-body" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--color-frost)" />
          <stop offset="55%" stopColor="var(--color-mint-dim)" />
          <stop offset="100%" stopColor="var(--color-led-1)" />
        </radialGradient>
      </defs>

      <g className="wobble">
        {ORBITS.map((o, index) => (
          <path
            key={o.rx}
            className={`sketch ${index === selected ? "sketch-accent" : ""}`}
            d={ellipsePath(CX, CY, o.rx, o.ry)}
          />
        ))}
        {/* Leader line from under the note to the selected orbit; it starts at the note's left
            edge so any name length works. Hidden on phones, where the scaled-down note is too small to read */}
        <path
          className="sketch sketch-solid sketch-accent max-sm:hidden"
          d={`M 40 62 Q 60 ${anchor.y - 24} ${anchor.x} ${anchor.y}`}
        />
      </g>
      <text x="24" y="46" className="note max-sm:hidden" fill="var(--color-amber)">
        {group.name}
      </text>

      <circle cx={CX} cy={CY} r="30" fill="url(#clay-sun)" />

      {ORBITS.map((o, index) => {
        const isSelected = index === selected
        const radius = 9 + (index % 3) * 2.5
        const start = pointOnOrbit(CX, CY, o, o.phase)
        return (
          <g
            key={o.rx}
            className="cursor-pointer"
            onClick={() => onSelect(index)}
            transform={animate ? undefined : `translate(${start.x} ${start.y})`}
          >
            {animate && (
              <animateMotion
                dur={`${o.period}s`}
                begin={`-${o.phase * o.period}s`}
                repeatCount="indefinite"
                path={ellipsePath(CX, CY, o.rx, o.ry)}
              />
            )}
            {/* Generous hit area: the body itself is small and moving */}
            <circle r="22" fill="transparent" />
            <circle r={radius} fill={isSelected ? "url(#clay-sun)" : "url(#clay-body)"} />
          </g>
        )
      })}
    </svg>
  )
}
