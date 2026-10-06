import { career } from "@/data/career"
import { Section } from "./Section"

/** The flight plan: one sketched trajectory down the left, a waypoint per job or degree. */
export function Career() {
  return (
    <Section id="career" title="Career">
      <ol className="relative">
        <svg
          className="wobble absolute top-0 left-[19px] h-full w-[10px] overflow-visible"
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="sketch" d="M5 0 V100" />
        </svg>
        {career.map((entry) => (
          <li
            key={entry.id}
            className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-x-5 pb-14 last:pb-0 lg:gap-x-8"
          >
            <span className="neu-inset mt-1 grid size-12 place-items-center rounded-full" aria-hidden="true">
              <span className={`size-3 rounded-full ${entry.current ? "bg-amber" : "bg-line"}`} />
            </span>
            <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div>
                <p className="note">{entry.period}</p>
                <p className="text-haze">{entry.place}</p>
              </div>
              <div className="max-w-[65ch]">
                <h3 className="display text-[22px] leading-7">{entry.title}</h3>
                <p className="mt-1 text-mint">{entry.name}</p>
                <ul className="mt-4 grid gap-3">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
                {entry.stack.length > 0 && (
                  <p className="mt-4 font-mono text-[15px] text-haze">
                    Stack: <span className="text-frost">{entry.stack.join(", ")}</span>
                  </p>
                )}
                <p className="mt-2 flex flex-wrap gap-x-4 font-mono text-[15px] text-haze">
                  Links:
                  {entry.links.map((link) => (
                    <a key={link.href} className="link" href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
