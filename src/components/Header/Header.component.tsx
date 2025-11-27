import { SocialSet } from "@components/Social/Social.component"
import "./Header.css"
import { PolygonMask } from "@utils/PolygonImage"
import { resume } from "@assets/index"

const ResumeButton = () => {
  return (
    <a
      target="_blank"
      href={resume}
      download="MartinSchubert.pdf"
      className="button-animation cursor-pointer group h-12 relative flex   items-center gap-3 px-8 p-1 mr-4 bg-opacity-0 text-[#f1f1f1]  border border-px rounded-full border-bline bg-transparent hover:bg-opacity-70  transition font-semibold shadow-md"
    >
      Resume
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="animation-boun"
        viewBox="0 0 24 24"
        height="24px"
        width="24px"
      >
        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
        <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Interface / Download">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#f1f1f1"
              d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
              id="Vector"
            ></path>
          </g>
        </g>
      </svg>
      <div className="absolute opacity-0 -bottom-4/4 rounded-md py-2 px-2 bg-transparent  left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity ">
        Download
      </div>
    </a>
  )
}

export const Header = () => {
  return (
    <>
      <div className=' relative h-40 md:h-70 background-pattern flex justify-center items-center border-l border-r  border-solid border-transparent [border-image:linear-gradient(to_bottom,transparent,var(--color-border))_1] after:content-[" "] after:absolute  after:bottom-0 after:w-full after:bg-linear-to-r after:from-(--color-border) after:via-transparent after:to-(--color-border) after:h-px matsu_border_side mastsu_border_after'>
        <PolygonMask />
      </div>
      <div className="career-header px-3 pt-6 flex flex-col intro w-full  border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,var(--color-border),transparent)_1] matsu_border_side">
        <div className="flex w-full flex-col justify-center items-center my-5">
          <h1 className="text-primarytext font-bold text-3xl sm:text-6xl ">Martin Schubert</h1>
          <h3 className="pt-2 text-violet-text text-md sm:text-2xl">• Software Engineer •</h3>
        </div>

        <div className="text-sm font-bold mt-5 sm:mt-7 text-zinc-400 ">Contact with me, here are my socials</div>
        <div className="flex w-full justify-between items-center mt-2">
          <SocialSet />
          <ResumeButton />
        </div>
      </div>
    </>
  )
}
