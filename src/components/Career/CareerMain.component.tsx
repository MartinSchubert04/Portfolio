import { type CareerItermProps } from "./CareerNav.component"

export const CareerMain = ({ careerItem }: CareerItermProps) => {
  return (
    <div className="flex-1 p-6 pt-4 relative">
      <div className="absolute w-[calc(100%-64px)]" style={{ opacity: 1, transform: "none" }}>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <img
              alt={careerItem.name}
              width="100"
              height="100"
              src={careerItem.imgURL}
              className="size-10 sm:size-12 rounded-md"
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-bold text-[#e7d2f9]">{careerItem.name}</h2>

                {/* Icons */}

                {/* 
                <a target="_blank" className="size-4 text-neutral-500" href="https://x.com/LJMU">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M214.75,211.71l-62.6-98.38,..."></path>
                  </svg>
                </a> */}
                <a target="_blank" href={careerItem.webLink}>
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
                </a>
              </div>

              <p className="text-xs sm:text-sm font-medium text-zinc-400">{careerItem.title}</p>
            </div>
          </div>
        </div>

        {/* Meta info */}
        <div className="text-zinc-400 mt-2 sm:mt-3 font-medium text-xs sm:text-sm">{careerItem.meta}</div>

        {/* Technologies */}
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          <div>
            <h4 className="text-sm md:text-md mt-2 sm:mt-3 mb-2 font-semibold text-primarytext dark:text-white">
              Technologies & Tools
            </h4>

            <div className="flex flex-wrap gap-2">
              {/* tech stack */}
              {careerItem.techStack.map((t, i: number) => (
                <a
                  key={i}
                  target="_blank"
                  className="inline-flex items-center text-xs sm:text-sm bg-black/5 dark:bg-[#ab66fd]/15 border border-dashed border-[#909092] dark:border-[#e7d2f9]/30 py-1 px-2 rounded-md skill-inner-shadow text-[#909092] dark:text-white"
                  href={t.link}
                >
                  <img alt="Python" src={t.img} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {careerItem.achievements.map((a, i: number) => (
            <div key={i} className="text-[#909092] flex flex-col space-y-2 text-[12px] sm:text-[15px] mt-4 font-medium">
              <p>• {a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
