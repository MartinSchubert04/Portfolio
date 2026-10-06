import { Pause, Play } from "@phosphor-icons/react"
import { sections, type SectionId } from "@/data/site"
import { useGithub } from "@/hooks/useGithub"
import { useNow } from "@/hooks/useNow"
import { contributionStats } from "@/lib/contributions"

const clock = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })
const integer = new Intl.NumberFormat("en")

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <span className={`items-baseline gap-2 whitespace-nowrap ${className}`}>
      <span className="text-haze">{label}</span>
      <span className="text-mint tabular-nums">{value}</span>
    </span>
  )
}

interface StatusBarProps {
  active: SectionId
  paused: boolean
  /** Absent when the system already asks for reduced motion: there is nothing left to toggle. */
  onTogglePaused?: () => void
}

/** The bottom bar of the reference: where you are, and live figures instead of decoration. */
export function StatusBar({ active, paused, onTogglePaused }: StatusBarProps) {
  const now = useNow()
  const { state } = useGithub()
  const index = sections.findIndex((section) => section.id === active)
  const stats = state.status === "ready" ? contributionStats(state.data.days) : null

  return (
    <footer
      aria-label="Status"
      className="fixed inset-x-0 bottom-0 z-(--z-index-bars) border-t border-line bg-hull pb-[env(safe-area-inset-bottom)] font-mono text-[13px] tracking-[0.06em] uppercase"
    >
      <div className="shell flex h-8 items-center justify-between gap-6">
        <Field label="Section" value={`${index + 1}/${sections.length} ${sections[index].label}`} className="flex" />
        {stats && (
          <>
            <Field label="Contributions" value={integer.format(stats.total)} className="hidden md:flex" />
            <Field label="Streak" value={`${stats.currentStreak} days`} className="hidden sm:flex" />
          </>
        )}
        <Field label="UTC" value={clock.format(now)} className="flex" />
        {onTogglePaused && (
          <button
            type="button"
            className="flex h-8 cursor-pointer items-center gap-2 tracking-[0.06em] whitespace-nowrap text-haze uppercase transition-colors hover:text-mint"
            aria-pressed={paused}
            onClick={onTogglePaused}
          >
            {paused ? (
              <Play size={14} weight="fill" aria-hidden="true" />
            ) : (
              <Pause size={14} weight="fill" aria-hidden="true" />
            )}
            <span>
              {paused ? "Play" : "Pause"}
              <span className="max-sm:sr-only"> Motion</span>
            </span>
          </button>
        )}
      </div>
    </footer>
  )
}
