import "./Social.css"
import { socials } from "@data/social.data"

interface SocialProps {
  link: string
  icon: string
}

export const Social = ({ link, icon }: SocialProps) => {
  return (
    <>
      <div
        className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/40"
        style={{ width: "40px" }}
      >
        <a
          href={link}
          target="blank"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primarytext"
        >
          <div
            className="skill-icon flex aspect-square cursor-pointer items-center justify-center rounded-full"
            style={{ width: "40px" }}
          >
            <img src={icon} width="32" height="32" alt={`Icono de ${link}`} />
          </div>
        </a>
      </div>
    </>
  )
}

export const SocialSet = () => {
  return (
    <>
      <div className="w-max m-3 h-12 p-1 px-1.5 flex items-center gap-2 rounded-full border border-px border-bline border-(--primary-color)">
        {socials.map((s) => (
          <Social {...s} key={s.icon} />
        ))}
      </div>
    </>
  )
}
