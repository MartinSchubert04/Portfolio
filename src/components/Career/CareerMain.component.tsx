import { type CareerItermProps } from "./CareerNav.component"
import * as Tooltip from "@radix-ui/react-tooltip"

export const CareerMain = ({ careerItem }: CareerItermProps) => {
  return (
    <div className="flex-1 p-6 pt-4 relative">
      <div className="absolute w-[calc(100%-64px)]" style={{ opacity: 1, transform: "none" }}>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <img alt={careerItem.name} src={careerItem.imgURL} className="h-10 rounded-md" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-bold text-[#e7d2f9]">{careerItem.name}</h2>

                {careerItem.linkedinLink && (
                  <a
                    target="_blank"
                    className="size-4 text-neutral-500"
                    data-state="closed"
                    data-slot="tooltip-trigger"
                    href={careerItem.linkedinLink}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                    </svg>
                  </a>
                )}

                <a target="_blank" className="text-neutral-500" href={careerItem.webLink}>
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
              <Tooltip.TooltipProvider delayDuration={0} disableHoverableContent>
                {careerItem.techStack.map((t, i: number) => (
                  <Tooltip.Root key={i}>
                    <Tooltip.Trigger asChild>
                      <a
                        target="_blank"
                        className="inline-flex items-center text-xs sm:text-sm bg-(--color-background-item)/15 border border-dashed border-[#909092] dark:border-[#e7d2f9]/30 py-1 px-2 rounded-md skill-inner-shadow text-[#909092] dark:text-white"
                        href={t.link}
                      >
                        <img alt="Python" src={t.img} className="size-4" />
                      </a>
                    </Tooltip.Trigger>

                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={12}
                        className="
                            animate-in fade-in-0 zoom-in-95
                            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                            data-[side=bottom]:slide-in-from-top-2
                            data-[side=left]:slide-in-from-right-2
                            data-[side=right]:slide-in-from-left-2
                            data-[side=top]:slide-in-from-bottom-2
                            z-50 w-fit origin-(--radix-tooltip-content-transform-origin) 
                            
                            rounded-md px-3 py-1.5 text-xs text-balance border-none text-(--color-primary) bg-(--color-bg-tooltip) fill-(--color-background)"
                        avoidCollisions={false}
                      >
                        <p className="">{t.name}</p>
                        <Tooltip.Arrow
                          className="
                              fill-(--color-bg-tooltip)
                              stroke-none
                              h-1
                              "
                        />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </Tooltip.TooltipProvider>
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
