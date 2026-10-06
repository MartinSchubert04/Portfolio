import { DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"
import { site } from "@/data/site"
import { Reveal } from "./Reveal"

/** Closing view. Like the hero, the text keeps left and the scene takes the rest: astronaut over the horizon. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-(--z-index-content) flex min-h-[100dvh] flex-col"
    >
      <div className="shell flex flex-1 items-start pt-28 pb-16 lg:items-center">
        <Reveal className="max-w-[560px]">
          <h2 id="contact-title" className="display text-[36px] md:text-[56px]">
            Let’s Work Together
          </h2>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-7">
            The quickest way to reach me is LinkedIn. The resume has the full story, and GitHub has the code.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a className="clay-button" href={site.resume} download={site.resumeFileName}>
              <DownloadSimple size={20} weight="bold" aria-hidden="true" />
              Download Resume
            </a>
            <a className="neu-button" href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={20} aria-hidden="true" />
              LinkedIn
            </a>
            <a className="neu-button" href={site.github} target="_blank" rel="noreferrer">
              <GithubLogo size={20} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
      {/* CC BY 4.0 asks for visible attribution of both models */}
      <p className="shell pb-16 text-[13px] leading-5 text-haze">
        3D models:{" "}
        <a
          className="link"
          href="https://sketchfab.com/3d-models/tenhun-falling-spaceman-fanart-9fd80b6a259f41fd99e6f56eee686dc5"
          target="_blank"
          rel="noreferrer"
        >
          astronaut by wallmasterr
        </a>{" "}
        and{" "}
        <a
          className="link"
          href="https://sketchfab.com/3d-models/simple-rocket-f73545304c4240489530b643c913f4c8"
          target="_blank"
          rel="noreferrer"
        >
          rocket by limine
        </a>
        , CC BY 4.0.
      </p>
    </section>
  )
}
