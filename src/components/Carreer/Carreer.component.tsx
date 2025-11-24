export const Carreer = () => {
  return (
    <div
      className="relative mt-1 sm:mt-4 w-full h-auto preserve-3d min-h-[400px] perspective-[1000px]"
      style={{ transformStyle: "preserve-3d", transform: "none" }}
    >
      <div
        className="backface-hidden absolute w-full border-l-[1px] border-r-[1px] border-solid border-transparent [border-image:linear-gradient(to_bottom,transparent,transparent,transparent,#362843)_1] after:content-[' '] after:absolute after:bottom-0 after:w-[100%] after:[background-image:linear-gradient(to_right,#362843,transparent,transparent,#362843)] after:h-[1px] matsu_border_side_long mastsu_border_after"
        style={{ backfaceVisibility: "hidden" }}
      >
        <section className="flex items-center justify-center bg-transparent text-gray-200">
          <div className="flex flex-col md:flex-row max-w-6xl w-full mx-auto bg-transparent rounded-lg overflow-hidden min-h-[400px]">
            {/* NAV */}
            <nav className="relative flex-shrink-0 w-full md:w-60 border-r border-transparent [border-image:linear-gradient(to_bottom,transparent,#e4e4e7,#e4e4e7,#e4e4e7,transparent)_1] dark:[border-image:linear-gradient(to_bottom,transparent,#362843,#362843,#362843,transparent)_1] py-5 flex md:flex-col overflow-x-auto md:overflow-y-auto whitespace-nowrap">
              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal blur-none text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block text-zinc-500 dark:text-[#8a2be2] font-bold">
                Liverpool John Moores University
                <div
                  className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-zinc-500 dark:bg-[#8a2be2] rounded-r-sm"
                  style={{ opacity: 1 }}
                />
                <div
                  className="md:hidden absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-500 dark:bg-[#8a2be2] rounded-t-sm"
                  style={{ opacity: 1 }}
                />
              </div>

              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block hover:bg-zinc-200 dark:hover:bg-purple-900/50">
                Agilite
              </div>

              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block hover:bg-zinc-200 dark:hover:bg-purple-900/50">
                Maximl Labs
              </div>

              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block hover:bg-zinc-200 dark:hover:bg-purple-900/50">
                Oracle Solution Services(India)
              </div>

              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block hover:bg-zinc-200 dark:hover:bg-purple-900/50">
                ASM Enterprise Solutions
              </div>

              <div className="relative px-2 py-3 cursor-pointer text-sm font-normal text-zinc-400 dark:text-[#e7d2f9] transition-colors duration-300 md:w-full inline-block md:block hover:bg-zinc-200 dark:hover:bg-purple-900/50">
                Poornima College of Engineering
              </div>
            </nav>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-6 pt-4 relative">
              <div className="absolute w-[calc(100%-64px)]" style={{ opacity: 1, transform: "none" }}>
                {/* Header */}
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Liverpool John Moores University"
                      width="100"
                      height="100"
                      src="/ljmu.png"
                      className="size-10 sm:size-12 rounded-md"
                    />

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-lg font-bold text-[#e7d2f9]">
                          Liverpool John Moores University
                        </h2>

                        {/* Icons */}
                        <a target="_blank" className="size-4 text-neutral-500" href="https://www.ljmu.ac.uk/">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M128,24h0A104,104,0,1,0,232,128,..."></path>
                          </svg>
                        </a>

                        <a target="_blank" className="size-4 text-neutral-500" href="https://x.com/LJMU">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M214.75,211.71l-62.6-98.38,..."></path>
                          </svg>
                        </a>

                        <a
                          target="_blank"
                          className="size-4 text-neutral-500"
                          href="https://www.linkedin.com/school/ljmu"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M216,24H40A16,16,..."></path>
                          </svg>
                        </a>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-zinc-400">Master of Science(MS) in AI&ML</p>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="text-zinc-400 mt-2 sm:mt-3 font-medium text-xs sm:text-sm">
                  Jan 2023 - Jul 2025 • Liverpool, UK (Remote)
                </div>

                {/* Technologies */}
                <div className="overflow-hidden transition-all duration-300 ease-in-out">
                  <div>
                    <h4 className="text-sm md:text-md mt-2 sm:mt-3 mb-2 font-semibold text-[#3f3f46] dark:text-white">
                      Technologies & Tools
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {/* Example skill */}
                      <a
                        target="_blank"
                        className="inline-flex items-center text-xs sm:text-sm bg-black/5 dark:bg-[#ab66fd]/15 border border-dashed border-[#909092] dark:border-[#e7d2f9]/30 py-1 px-2 rounded-md skill-inner-shadow text-[#909092] dark:text-white"
                        href="https://www.python.org/"
                      >
                        <img alt="Python" src="/icons/python.svg" className="size-4" />
                      </a>

                      {/* ... repetir para los demás íconos ... */}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-[#909092] flex flex-col space-y-2 text-[12px] sm:text-[15px] mt-4 font-medium">
                    <p>• Learned advanced AI and ML concepts...</p>
                    <p>• Developed a melanoma detection model...</p>
                    <p>• Published a thesis on ...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* BACKSIDE (3D FLIP) */}
      <div
        className="w-full absolute flex items-center min-h-[400px] backface-hidden"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {/* <mux-player
          player-software-name="mux-player-react"
          player-software-version="3.9.0"
          accent-color="#ab66fd"
          playback-id="zGogrLp7lNNilGtRENeLzOw72Dnm3jzlbwdQUwcc46w"
        /> */}
      </div>
    </div>
  )
}
