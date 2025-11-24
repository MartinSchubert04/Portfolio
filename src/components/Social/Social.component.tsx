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
        className="skill-icon flex aspect-square cursor-pointer items-center justify-center rounded-full"
        style={{ width: "40px" }}
      >
        <a
          href={link}
          target="blank"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-primarytext"
        >
          <img src={icon} width="32" height="32" />
        </a>
      </div>
    </>
  )
}

export const SocialSet = () => {
  return (
    <>
      <div className="px-3 pt-3 flex flex-row gap-4 w-full ">
        {socials.map((s) => (
          <Social {...s} key={s.icon} />
        ))}
      </div>
    </>
  )
}
