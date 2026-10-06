import { DownloadSimple } from "@phosphor-icons/react"
import { site } from "@/data/site"

/** Text on the left; the right half belongs to the scene (globe and astronaut, see choreography.ts). */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="top-title"
      className="relative z-(--z-index-content) flex min-h-[100dvh] items-start lg:items-center"
    >
      <div className="shell pt-28 pb-20 lg:pt-24">
        <div className="max-w-[560px]">
          <h1 id="top-title" className="display text-[52px] sm:text-[72px] lg:text-[88px]">
            {site.name}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-7 text-frost">{site.pitch}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a className="clay-button" href={site.resume} download={site.resumeFileName}>
              <DownloadSimple size={20} weight="bold" aria-hidden="true" />
              Download Resume
            </a>
            <a className="neu-button" href="#projects">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
