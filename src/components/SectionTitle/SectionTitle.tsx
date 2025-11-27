export const Title = ({ sectionAhead, title }: any) => {
  return (
    <>
      <p className="text-manrope text-[oklch(70.5% 0.015 286.067)] dark:text-zinc-400 text-sm font-light">
        {sectionAhead}
      </p>
      <span className="text-primarytext font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl ">{title}</span>
    </>
  )
}
