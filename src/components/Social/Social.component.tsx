import "./Social.css"
import { socials } from "@data/social.data"
import { mail, copy } from "@assets/index"
import { useState } from "react"
import { showError } from "@utils/errorHandling"

const TEXT_TO_COPY = "tinchoschubert04429@gmail.com"

interface SocialProps {
  link: string
  icon: string
}

export const Social = ({ link, icon }: SocialProps) => {
  return (
    <>
      <div className="flex justify-center items-center w-12 group hover:scale-115 hover:-translate-y-3 transition duration-500">
        <div className="absolute w-12 h-12 rounded-full bg-(--color-bg-social) opacity-0 group-hover:opacity-40 transition duration-500"></div>
        <div
          className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-(--color-bg-social)"
          style={{ width: "40px", zIndex: "100" }}
        >
          <a
            href={link}
            target="blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-(--color-bg-social) "
          >
            <div
              className="skill-icon flex aspect-square cursor-pointer items-center justify-center rounded-full"
              style={{ width: "40px" }}
            >
              <img src={icon} width="32" height="32" alt={`Icono de ${link}`} />
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export const SocialSet = () => {
  const [copied, setCopied] = useState(false)
  const [animation, setAnimation] = useState("")
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEXT_TO_COPY)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
        setAnimation("animate-[rotate-3d-out_0.5s_forwards]")
      }, 1500)
    } catch (err) {
      showError(err)
    }
  }
  return (
    <>
      <div className="w-max m-3 h-12 p-1 px-1.5 flex items-center gap-2 rounded-full border border-px border-bline border-(--color-primary)">
        {socials.map((s) => (
          <Social {...s} key={s.icon} />
        ))}

        <div className="flex justify-center items-center w-12 group hover:scale-115 hover:-translate-y-3 transition duration-500">
          <div className="absolute w-12 h-12 rounded-full bg-(--color-bg-social) opacity-0 group-hover:opacity-40 transition duration-500"></div>
          <div
            className="flex aspect-square cursor-pointer items-center justify-center rounded-full bg-(--color-bg-social)"
            style={{ width: "40px", zIndex: "100" }}
          >
            <a onClick={handleCopy} className="flex items-center justify-center w-10 h-10 rounded-full bg-primarytext">
              <div
                className="skill-icon flex aspect-square cursor-pointer items-center justify-center rounded-full"
                style={{ width: "40px" }}
              >
                {!copied ? (
                  <img src={mail} className={animation} width="30" height="32" />
                ) : (
                  <img src={copy} className="animate-[rotate-3d-in_0.5s_forwards]" width="30" height="32" />
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
