import type { ReactNode } from "react"
import type { SectionId } from "@/data/site"
import { Reveal } from "./Reveal"

interface SectionProps {
  id: SectionId
  title: string
  children: ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative z-(--z-index-content)">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2 id={`${id}-title`} className="display text-[36px] md:text-[56px]">
            {title}
          </h2>
          <div className="mt-10 md:mt-14">{children}</div>
        </Reveal>
      </div>
    </section>
  )
}
