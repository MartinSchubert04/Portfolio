import { githubService } from "@service/Github.service"
import { useOnInit } from "@hooks/hooks"
import { showError } from "@utils/errorHandling"
import { useState } from "react"
import { prepareContributionDataFlat } from "./DataFormmat"
import * as Tooltip from "@radix-ui/react-tooltip"
import { CircularProgress } from "@mui/material"
import "./Contributions.css"

interface RectContributionProps {
  count: number
  date: string // Formato YYYY-MM-DD
  level: number
  x: number
  y: number
}

const RectContribution = ({ count, date, level, x, y }: RectContributionProps) => {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))

  const tooltipText = `${count} contributions on ${formattedDate}`
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <g data-slot="tooltip-trigger">
          <rect
            className={`
              data-[level="0"]:fill-muted-foreground/5 dark:data-[level="0"]:fill-[#151b23] 
              data-[level="1"]:fill-muted-foreground/20 dark:data-[level="1"]:fill-[#033a16] 
              data-[level="2"]:fill-muted-foreground/40 dark:data-[level="2"]:fill-[#196c2e] 
              data-[level="3"]:fill-muted-foreground/60 dark:data-[level="3"]:fill-[#2ea043] 
              data-[level="4"]:fill-muted-foreground/80 dark:data-[level="4"]:fill-[#56d364]
            `}
            data-count={count}
            data-date={date}
            data-level={level}
            x={x}
            y={y}
            height="11"
            rx="2"
            ry="2"
            width="11"
          ></rect>
        </g>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          className="
          animate-in fade-in-0 zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2
          z-50 w-fit origin-(--radix-tooltip-content-transform-origin) 
          
          rounded-md px-3 py-1.5 text-xs text-balance border boder-bline text-(--color-primary) bg-(--color-background) fill-(--color-background) font-sans"
          avoidCollisions={false}
        >
          <p className="">{tooltipText}</p>
          <Tooltip.Arrow className="fill-(--color-primary)" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

interface ContributionDay {
  date: string
  contributionCount: number
  level: number
  x: number
  y: number
}

export const Contributions = () => {
  const [contributionDays, setContributionDays] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const currentYear = new Date().getFullYear()

  useOnInit(async () => {
    try {
      setLoading(true)
      const contributionsData = await githubService.getCommitData()

      const allContributions = contributionsData.contributions

      setTotalContributions(contributionsData.total[currentYear])

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const oneYearAgo = new Date(today)
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

      // eslint-disable-next-line
      const lastYearContributions = allContributions.filter((c: any) => {
        const d = new Date(c.date)
        return d >= oneYearAgo && d <= today
      })
      // eslint-disable-next-line
      lastYearContributions.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setContributionDays(prepareContributionDataFlat(lastYearContributions))

      setLoading(false)
    } catch (e) {
      showError(e)
    } finally {
      setLoading(false)
    }
  })

  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <div className="px-3 w-full flex flex-col pt-8 border-l border-r  border-solid border-transparent [border-image:linear-gradient(to_bottom,#362843,transparent)_1] matsu_border_side ">
        <p className="text-manrope text-[oklch(70.5% 0.015 286.067)] dark:text-zinc-400 text-sm font-light">
          Contributions
        </p>
        <span className="text-primarytext text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mb-10">Github</span>

        {loading ? (
          <div className="loading-wheel">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className="flex w-max max-w-full flex-col gap-2 mx-auto py-2">
            <div className="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar" title="GitHub Contributions">
              <svg className="flex items-center overflow-visible" height="117" viewBox="0 0 739 117" width="739">
                <title>Contribution Graph</title>
                <g className="text-primarytext fill-current">
                  <text dominantBaseline="hanging" x="14">
                    Dec
                  </text>
                  <text dominantBaseline="hanging" x="84">
                    Jan
                  </text>
                  <text dominantBaseline="hanging" x="140">
                    Feb
                  </text>
                  <text dominantBaseline="hanging" x="196">
                    Mar
                  </text>
                  <text dominantBaseline="hanging" x="266">
                    Apr
                  </text>
                  <text dominantBaseline="hanging" x="322">
                    May
                  </text>
                  <text dominantBaseline="hanging" x="378">
                    Jun
                  </text>
                  <text dominantBaseline="hanging" x="448">
                    Jul
                  </text>
                  <text dominantBaseline="hanging" x="504">
                    Aug
                  </text>
                  <text dominantBaseline="hanging" x="574">
                    Sep
                  </text>
                  <text dominantBaseline="hanging" x="630">
                    Oct
                  </text>
                  <text dominantBaseline="hanging" x="686">
                    Nov
                  </text>
                </g>

                {contributionDays.map((day) => (
                  <RectContribution
                    key={day.date}
                    count={day.contributionCount}
                    date={day.date}
                    level={day.level} // aca se usa el nivel calculado
                    x={day.x}
                    y={day.y}
                  />
                ))}
              </svg>
            </div>
            <div className="flex flex-wrap w-full justify-between gap-1 whitespace-nowrap sm:gap-x-4 px-2">
              <div className="text-manrope text-primarytext text-muted-foreground">
                {totalContributions} contributions on {currentYear} in{" "}
                <a
                  className="text-primarytext font-medium underline underline-offset-4"
                  href="https://github.com/MartinSchubert04"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
                .
              </div>
              <div className="ml-auto flex items-center gap-[3px]">
                <span className="text-primarytext mr-1 text-muted-foreground">Less</span>
                <svg height="11" width="11">
                  <rect
                    className={`fill-muted-foreground/5 dark:fill-[#151b23] `}
                    height="11"
                    rx="2"
                    ry="2"
                    width="11"
                  ></rect>
                </svg>
                <svg height="11" width="11">
                  <rect
                    className={`fill-muted-foreground/5 dark:fill-[#033a16]`}
                    height="11"
                    rx="2"
                    ry="2"
                    width="11"
                  ></rect>
                </svg>
                <svg height="11" width="11">
                  <rect
                    className={`fill-muted-foreground/5 dark:fill-[#196c2e]`}
                    height="11"
                    rx="2"
                    ry="2"
                    width="11"
                  ></rect>
                </svg>
                <svg height="11" width="11">
                  <rect
                    className={`fill-muted-foreground/5 dark:fill-[#2ea043]`}
                    height="11"
                    rx="2"
                    ry="2"
                    width="11"
                  ></rect>
                </svg>
                <svg height="11" width="11">
                  <rect
                    className={`fill-muted-foreground/5 dark:fill-[#56d364]`}
                    height="11"
                    rx="2"
                    ry="2"
                    width="11"
                  ></rect>
                </svg>
                <span className="text-primarytext ml-1 text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Tooltip.Provider>
  )
}
