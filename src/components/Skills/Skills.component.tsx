import { skills } from "@data/skills.data"

interface SkillProps {
  name: string
  link: string
  icono: string
}

const Skill = ({ name, link, icono }: SkillProps) => {
  return (
    <a
      target="_blank"
      className="inline-flex items-center text-xs sm:text-sm bg-black/5 dark:bg-[#ab66fd]/15 border border-dashed border-[#909092] dark:border-[#e7d2f9]/30  py-1 px-2 rounded-md skill-inner-shadow self-end text-[#909092] dark:text-white hover:text-[#909092] dark:hover:text-white"
      href={link}
    >
      <div className="size-2 sm:size-4 shrink-0">
        <img
          alt={name}
          loading="lazy"
          width="16"
          height="16"
          decoding="async"
          src={icono}
          data-nimg="1"
          className="size-4"
        />
      </div>
      <p className="ml-1 text-xs sm:text-sm font-bold">{name}</p>
    </a>
  )
}

export const SkillSet = () => {
  return (
    <div className="px-3 flex flex-col w-full border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,#362843,transparent)_1] matsu_border_side ">
      <div className="mt-10">
        <p className="text-[oklch(70.5% 0.015 286.067)] dark:text-zinc-400 text-sm font-light">Core</p>
        <span className="text-primarytext font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl ">Skills</span>
        <div className="flex flex-wrap gap-1.5 pt-4 sm:pt-8 w-full">
          {skills.map((s) => (
            <Skill {...s} key={s.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
