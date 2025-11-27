import { career } from "@data/career.data"
import { CareerMain } from "./CareerMain.component"
import { useState } from "react"

export interface ICareer {
  imgURL: string
  title: string
  name: string
  meta: string
  achievements: string[]
  webLink: string
  linkedinLink: string
  techStack: {
    img: string
    link: string
  }[]
}

export interface CareerItermProps {
  careerItem: ICareer
}

const CareerNavItem = ({ careerItem, onSelect }: CareerNavItemProps) => {
  return (
    <div
      className="text-manrope  relative px-2  py-3 cursor-pointer text-sm sm:text-sm font-normal blur-none text-zinc-400  transition-colors duration-300 md:w-full inline-block md:block  "
      onClick={() => onSelect(careerItem)}
    >
      {careerItem.name}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-zinc-500 dark:bg-[#8a2be2] rounded-r-sm"></div>
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[3px] bg-zinc-500 dark:bg-[#8a2be2] rounded-t-sm"></div>
    </div>
  )
}

interface CareerNavItemProps extends CareerItermProps {
  onSelect: (item: ICareer) => void
  isSelected: boolean
}

export const CareerNav = () => {
  const [selectedCareer, setSelectedCareer] = useState<ICareer>(career[0])

  const handleSelectCareer = (item: ICareer) => {
    setSelectedCareer(item)
  }

  return (
    <div
      className="relative mt-1 sm:mt-4 w-full h-auto preserve-3d min-h-[400px] perspective-[1000px]"
      style={{ transformStyle: "preserve-3d", transform: "none" }}
    >
      <div
        className="backface-hidden absolute w-full border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,transparent,transparent,transparent,var(--color-border))_1] after:content-[' '] after:absolute after:bottom-0 after:w-full after:bg-[linear-gradient(to_right,var(--color-border),transparent,transparent,var(--color-border))] after:h-px matsu_border_side_long mastsu_border_after"
        style={{ backfaceVisibility: "hidden" }}
      >
        <section className="flex items-center justify-center bg-transparent text-gray-200">
          <div className="flex flex-col md:flex-row max-w-6xl w-full mx-auto bg-transparent rounded-lg overflow-hidden min-h-[400px]">
            {/* NAV */}
            <nav className="flex  relative shrink-0 w-full md:w-60 border-r border-transparent [border-image:linear-gradient(to_bottom,transparent,,#e4e4e7,#e4e4e7,transparent)_1] dark:[border-image:linear-gradient(to_bottom,transparent,var(--color-border),var(--color-border),var(--color-border),transparent)_1] py-5  md:flex-col overflow-x-auto md:overflow-y-auto whitespace-nowrap justify-start">
              {/* eslint-disable-next-line */}
              {career.map((c: any) => (
                <CareerNavItem
                  careerItem={c}
                  onSelect={handleSelectCareer}
                  isSelected={c.name === selectedCareer.name}
                  key={c.name}
                />
              ))}
            </nav>

            <CareerMain careerItem={selectedCareer} />
          </div>
        </section>
      </div>
    </div>
  )
}
