import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react"
import { PROJECT_IMAGE_SIZE, projects } from "@/data/projects"
import { Section } from "./Section"

// Two cards per row, the wide one alternating sides: 7+5, 5+7, 7+5.
const spanFor = (index: number) => (index % 4 === 0 || index % 4 === 3 ? "lg:col-span-7" : "lg:col-span-5")

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-8 lg:grid-cols-12">
        {projects.map((project, index) => (
          <li key={project.id} className={`clay clay-press flex flex-col p-4 sm:p-5 ${spanFor(index)}`}>
            <img
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              width={PROJECT_IMAGE_SIZE.width}
              height={PROJECT_IMAGE_SIZE.height}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-[18px] object-cover object-top lg:aspect-auto lg:h-[280px]"
            />
            <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
              <h3 className="display text-[22px] leading-7" translate="no">
                {project.name}
              </h3>
              <p className="mt-2 max-w-[60ch]">{project.description}</p>
              <p className="mt-3 font-mono text-[14px] text-haze" translate="no">
                {project.stack.join(", ")}
              </p>
              <p className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5">
                <a
                  className="link inline-flex min-h-10 items-center gap-2"
                  href={project.sourceLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogo size={20} aria-hidden="true" />
                  Source Code
                  <span className="sr-only">of {project.name}</span>
                </a>
                {project.webLink && (
                  <a
                    className="link inline-flex min-h-10 items-center gap-2"
                    href={project.webLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowUpRight size={20} aria-hidden="true" />
                    Live Site
                    <span className="sr-only">of {project.name}</span>
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
