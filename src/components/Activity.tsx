import { ArrowClockwise } from "@phosphor-icons/react"
import { useGithub } from "@/hooks/useGithub"
import { contributionStats } from "@/lib/contributions"
import { GITHUB_PROFILE, type Commit } from "@/lib/github"
import { LedCalendar, LedCalendarSkeleton } from "./LedCalendar"
import { Section } from "./Section"

const integer = new Intl.NumberFormat("en")
const shortDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" })

function Readout({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="neu-inset px-5 py-4">
      <dt className="label">{label}</dt>
      <dd className="display mt-1 text-[28px] leading-9 tabular-nums">
        {value ?? <span className="skeleton block h-9 w-20" />}
      </dd>
    </div>
  )
}

function CommitLog({ commits }: { commits: Commit[] }) {
  if (commits.length === 0) {
    return (
      <p className="text-haze">
        The commit log is not available right now. It is all on{" "}
        <a className="link" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    )
  }
  return (
    <ul className="grid gap-2 font-mono text-[15px]">
      {commits.map((commit) => (
        <li key={commit.sha}>
          <a
            className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3"
            href={commit.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-mint" translate="no">
              {commit.repo}
            </span>
            <span className="truncate group-hover:text-amber">{commit.message}</span>
            <time className="text-haze tabular-nums" dateTime={commit.date}>
              {shortDate.format(new Date(commit.date))}
            </time>
          </a>
        </li>
      ))}
    </ul>
  )
}

/** GitHub activity on one neumorphic console: LED calendar, four readouts, the latest commits. */
export function Activity() {
  const { state, retry } = useGithub()

  if (state.status === "error") {
    return (
      <Section id="activity" title="Activity">
        <div className="neu p-6 sm:p-8" role="alert">
          <p>GitHub did not answer ({state.message}). The rest of the page does not depend on it.</p>
          <button type="button" className="neu-button mt-6" onClick={retry}>
            <ArrowClockwise size={20} aria-hidden="true" />
            Try Again
          </button>
        </div>
      </Section>
    )
  }

  const data = state.status === "ready" ? state.data : null
  const stats = data ? contributionStats(data.days) : null
  const figure = (value: number | undefined) => (value === undefined ? null : integer.format(value))

  return (
    <Section id="activity" title="Activity">
      <div className="neu p-5 sm:p-8" aria-busy={!data}>
        {data && stats ? <LedCalendar days={data.days} total={stats.total} /> : <LedCalendarSkeleton />}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <dl className="grid grid-cols-2 gap-4">
            <Readout label="Contributions" value={figure(stats?.total)} />
            <Readout label="Active Days" value={figure(stats?.activeDays)} />
            <Readout label="Current Streak" value={figure(stats?.currentStreak)} />
            <Readout label="Longest Streak" value={figure(stats?.longestStreak)} />
          </dl>
          <div>
            <h3 className="label">Latest Commits</h3>
            <div className="mt-3">
              {data ? <CommitLog commits={data.commits} /> : <div className="skeleton h-[196px] w-full" />}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
