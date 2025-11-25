import { githubService } from "@components/service/Github.service"
import { useOnInit } from "@hooks/hooks"
import { showError } from "@utils/errorHandling"
import { useState } from "react"
import { prepareContributionData, type ContributionDay } from "./DataFormmat"
import * as Tooltip from "@radix-ui/react-tooltip"

interface RectContributionProps {
  count: number
  date: string // Formato YYYY-MM-DD
  level: number
  x: number
  y: number
}

const RectContribution = ({ count, date, level, x, y }: RectContributionProps) => {
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))

  const tooltipText = `${count} contribuciones el ${formattedDate}`
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <g data-state="closed" data-slot="tooltip-trigger">
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

      <Tooltip.Content className="bg-black text-white p-2 rounded text-sm shadow-md" sideOffset={5}>
        {tooltipText}
        <Tooltip.Arrow className="fill-black" />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const Contributions = () => {
  const [contributionDays, setContributionDays] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState<number>(0)

  useOnInit(async () => {
    try {
      const commitData = await githubService.getCommitData()
      const formatedData = prepareContributionData(commitData)

      const total = commitData.totalContributions

      setContributionDays(formatedData)
      setTotalContributions(total || 0)
    } catch (e) {
      showError(e)
    }
  })

  return (
    <div className="px-3 w-full flex flex-col pt-8 border-l border-r  border-solid border-transparent [border-image:linear-gradient(to_bottom,#362843,transparent)_1] matsu_border_side ">
      <p className="text-[oklch(70.5% 0.015 286.067)] dark:text-zinc-400 text-sm font-light">Contributions</p>
      <span className="text-primarytext text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold mb-10">Github</span>
      <div className="flex w-max max-w-full flex-col gap-2 mx-auto py-2">
        <div className="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar" title="GitHub Contributions">
          <svg className="flex items-center overflow-visible" height="117" viewBox="0 0 739 117" width="739">
            <title>Contribution Graph</title>
            <g className="text-primarytext fill-current">
              <text dominant-baseline="hanging" x="14">
                Dec
              </text>
              <text dominant-baseline="hanging" x="84">
                Jan
              </text>
              <text dominant-baseline="hanging" x="140">
                Feb
              </text>
              <text dominant-baseline="hanging" x="196">
                Mar
              </text>
              <text dominant-baseline="hanging" x="266">
                Apr
              </text>
              <text dominant-baseline="hanging" x="322">
                May
              </text>
              <text dominant-baseline="hanging" x="378">
                Jun
              </text>
              <text dominant-baseline="hanging" x="448">
                Jul
              </text>
              <text dominant-baseline="hanging" x="504">
                Aug
              </text>
              <text dominant-baseline="hanging" x="574">
                Sep
              </text>
              <text dominant-baseline="hanging" x="630">
                Oct
              </text>
              <text dominant-baseline="hanging" x="686">
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
          <div className="text-primarytext text-muted-foreground">
            {totalContributions} contributions in {new Date().getFullYear()} on{" "}
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
            <g data-state="closed" data-slot="tooltip-trigger">
              <rect
                className={`
                    fill-muted-foreground/5 dark:data-[level="0"]:fill-[#151b23] 
                `}
                height="11"
                rx="2"
                ry="2"
                width="11"
              ></rect>
            </g>
            <g data-state="closed" data-slot="tooltip-trigger">
              <rect
                className={`
                    fill-muted-foreground/20 dark:data-[level="1"]:fill-[#033a16] 
                `}
                data-level={3}
                height="11"
                rx="2"
                ry="2"
                width="11"
              ></rect>
            </g>
            <g data-state="closed" data-slot="tooltip-trigger">
              <rect
                className={`
                    data-[level="0"]:fill-muted-foreground/5 dark:data-[level="0"]:fill-[#151b23] 
                    data-[level="1"]:fill-muted-foreground/20 dark:data-[level="1"]:fill-[#033a16] 
                    data-[level="2"]:fill-muted-foreground/40 dark:data-[level="2"]:fill-[#196c2e] 
                    data-[level="3"]:fill-muted-foreground/60 dark:data-[level="3"]:fill-[#2ea043] 
                    data-[level="4"]:fill-muted-foreground/80 dark:data-[level="4"]:fill-[#56d364]
                `}
                data-level={3}
                height="11"
                rx="2"
                ry="2"
                width="11"
              ></rect>
            </g>
            <span className="text-primarytext ml-1 text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
