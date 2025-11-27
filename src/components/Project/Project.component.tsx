import { Title } from "@components/SectionTitle/SectionTitle"
import { projects } from "@data/projects.data"

interface Project {
  imgURL: string
  name: string
  description: string
  sourceLink: string
  techStack: string[]
}

interface ProjectProps {
  project: Project
}

interface IProjectProps {
  nombre: string
}

const ProjectTech = ({ nombre }: IProjectProps) => {
  return (
    <div className="inline-flex items-center rounded-sm  font-semibold  bg-[#b06dff]/25  text-[#e7d2f9]  px-1 py-0 text-[11px] skill-m">
      {nombre}
    </div>
  )
}

const Project = ({ project }: ProjectProps) => {
  return (
    <div className=" rounded-lg  bg-[#06030a] text-card-foreground shadow  shadow-[#4d4d4d] flex flex-col  card-border bg-card-m min-h-[400px]">
      <div className="flex w-full max-h-48 min-h-48 rounded-t-lg flex-col space-y-1.5  pb-2 skeleton relative p-3 gradient-custom">
        <img className="h-full w-full rounded-md object-cover" src={project.imgURL} />
      </div>
      <div className="px-4 py-2 pt-0 flex flex-col gap-1">
        <div className="font-sans text-lg font-bold text-zinc-500 dark:text-(--color-primary)  mt-2">
          {project.name}
        </div>
        <div className="prose max-w-full mt-2 text-pretty font-sans text-md text-zinc-400 dark:prose-invert ">
          <p>{project.description}</p>
        </div>
      </div>

      <div className="p-4 pt-2 flex  flex-col items-start justify-between gap-4">
        <span className="text-sm text-zinc-500 font-medium">Tech-stack</span>
        <div className=" flex flex-wrap gap-1">
          {project.techStack.map((techName) => (
            <ProjectTech nombre={techName} key={techName} />
          ))}
        </div>

        <div className="flex flex-row flex-wrap items-start gap-1 ">
          <a target="_blank" href={project.sourceLink}>
            <div className="items-center rounded-sm font-semibold transition-colors focus:outline-none bg-transparent  text-[#909097] dark:text-[#e7d2f9]   flex gap-2 px-2 py-2 text-[12px]  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-globe size-3"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              Website
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export const ProjectSet = () => {
  return (
    <div className='relative  w-full mt-10 pb-4 flex flex-col border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,transparent,transparent,transparent,var(--color-border))_1] after:content-[" "] after:absolute  after:bottom-0 after:w-full after:bg-[linear-gradient(to_right,var(--color-border),transparent,transparent,var(--color-border))] after:h-px matsu_border_side_long mastsu_border_after'>
      <div className="px-3">
        <Title sectionAhead="Featured" title="Projects" />
      </div>

      <div className="px-3 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        {projects.map((p) => (
          <Project project={p} key={p.name} />
        ))}
      </div>
    </div>
  )
}
