import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react"
import { monthLabels, toCells, type ContributionDay } from "@/lib/contributions"

// One LED plus its gap. Kept in JS as well because the month labels are placed by column.
const CELL = 16
const GAP = 4
const PITCH = CELL + GAP

const dayFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" })
const integer = new Intl.NumberFormat("en")
const plural = new Intl.PluralRules("en")

const contributions = (count: number) =>
  `${integer.format(count)} ${plural.select(count) === "one" ? "contribution" : "contributions"}`

interface LedCalendarProps {
  days: ContributionDay[]
  total: number
}

/**
 * The contribution year as an LED matrix on the console: an unlit day is an inset well, a lit one
 * is a step of the mint ramp (one hue, darker to brighter). Hovering or tapping a day reads it out.
 */
export function LedCalendar({ days, total }: LedCalendarProps) {
  const cells = useMemo(() => toCells(days), [days])
  const labels = useMemo(() => monthLabels(cells), [cells])
  const weeks = cells.length > 0 ? cells[cells.length - 1].week + 1 : 0
  const [picked, setPicked] = useState<number | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // On narrow screens the matrix scrolls; start at the newest week
  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [weeks])

  const onPointerOver = (event: PointerEvent) => {
    const index = (event.target as HTMLElement).dataset.index
    if (index !== undefined) setPicked(Number(index))
  }

  const day = picked === null ? null : cells[picked]

  return (
    <div>
      <div
        ref={scrollerRef}
        className="overflow-x-auto pb-2"
        tabIndex={0}
        role="img"
        aria-label={`Contribution calendar: ${contributions(total)} in the last year`}
      >
        <div style={{ width: weeks * PITCH - GAP }} className="mx-auto">
          <div className="relative h-6 font-mono text-[13px] text-haze" aria-hidden="true">
            {labels.map((label) => (
              <span
                key={`${label.week}-${label.label}`}
                className="absolute top-0"
                style={{ left: label.week * PITCH }}
              >
                {label.label}
              </span>
            ))}
          </div>
          <div
            className="grid grid-flow-col"
            style={{ gridTemplateRows: `repeat(7, ${CELL}px)`, gridAutoColumns: CELL, gap: GAP }}
            onPointerOver={onPointerOver}
            onPointerLeave={() => setPicked(null)}
          >
            {cells.map((cell, index) => (
              <span
                key={cell.date}
                className="led"
                data-level={cell.level}
                data-index={index}
                style={index === 0 ? { gridRowStart: cell.weekday + 1 } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[14px]">
        <p className="tabular-nums" aria-hidden="true">
          {day ? (
            <>
              <span className="text-haze">{dayFormat.format(new Date(`${day.date}T00:00:00Z`))}: </span>
              {contributions(day.count)}
            </>
          ) : (
            <span className="text-haze">Point at a day to read it</span>
          )}
        </p>
        <p className="flex items-center gap-2 text-haze" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="led inline-block size-4" data-level={level} />
          ))}
          More
        </p>
      </div>
    </div>
  )
}

/** Same footprint as the calendar, so nothing jumps when the data arrives. */
export function LedCalendarSkeleton() {
  return <div className="skeleton h-[170px] w-full" />
}
