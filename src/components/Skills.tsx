import { useRef, useState, type KeyboardEvent } from "react"
import { skillGroups } from "@/data/skills"
import { OrbitMap } from "./OrbitMap"
import { Section } from "./Section"

/** Orbit map on the left, a neumorphic console on the right: pick a group, read its skills. */
export function Skills({ animate }: { animate: boolean }) {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const group = skillGroups[selected]

  const onKeyDown = (event: KeyboardEvent) => {
    const last = skillGroups.length - 1
    let next: number
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = selected === last ? 0 : selected + 1
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = selected === 0 ? last : selected - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last
    else return
    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="skills" title="Skills">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
        <OrbitMap selected={selected} onSelect={setSelected} animate={animate} />
        <div className="neu p-5 sm:p-7">
          <p className="label" id="skills-tabs-label">
            Skill Groups
          </p>
          <div
            role="tablist"
            aria-labelledby="skills-tabs-label"
            className="mt-4 flex flex-wrap gap-3"
            onKeyDown={onKeyDown}
          >
            {skillGroups.map((item, index) => (
              <button
                key={item.name}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`skills-tab-${index}`}
                aria-selected={index === selected}
                aria-controls="skills-panel"
                tabIndex={index === selected ? 0 : -1}
                className="neu-button min-h-11 px-4 text-[15px]"
                onClick={() => setSelected(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="skills-panel"
            aria-labelledby={`skills-tab-${selected}`}
            className="neu-inset mt-6 min-h-[168px] p-5"
          >
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <a className="neu-chip" href={skill.link} target="_blank" rel="noreferrer" translate="no">
                    {skill.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
