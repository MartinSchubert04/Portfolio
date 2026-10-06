import { sections, site, type SectionId } from "@/data/site"

const links = sections.filter((section) => section.id !== "top")

export function TopBar({ active }: { active: SectionId }) {
  return (
    <header className="fixed inset-x-0 top-0 z-(--z-index-bars) pt-[max(12px,env(safe-area-inset-top))]">
      <nav aria-label="Sections" className="shell">
        <div className="neu flex h-14 items-center justify-between gap-4 rounded-full px-2 sm:pl-6">
          <a
            href="#top"
            className="display hidden text-[17px] whitespace-nowrap hover:text-mint sm:block"
            translate="no"
          >
            {site.name}
          </a>
          <ul className="flex min-w-0 flex-1 items-center justify-between gap-1 sm:flex-none sm:justify-end">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="flex h-10 items-center rounded-full px-2 text-[14px] text-haze transition-colors hover:text-mint aria-[current]:bg-well aria-[current]:text-amber aria-[current]:shadow-[inset_3px_3px_8px_var(--color-hull-lo),inset_-2px_-2px_6px_var(--color-hull-hi)] sm:px-4 sm:text-[15px]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
