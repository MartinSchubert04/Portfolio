import { SocialSet } from "@components/Social/Social.component"
export const Header = () => {
  return (
    <>
      <div className='relative background-pattern flex justify-center items-center h-60 border-l border-r  border-solid border-transparent [border-image:linear-gradient(to_bottom,transparent,#362843)_1] after:content-[" "] after:absolute  after:bottom-0 after:w-full after:bg-linear-to-r after:from-[#362843] after:via-transparent after:to-[#362843] after:h-px matsu_border_side mastsu_border_after'>
        {/* <PolygonImg /> */}
      </div>
      <div className="carreer-header px-3 pt-6 flex flex-col intro w-full  border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,#362843,transparent)_1] matsu_border_side">
        <h1 className="text-primarytext font-bold text-3xl sm:text-4xl ">Martin Schubert</h1>
        <h3 className="pt-2 text-violet-text text-md sm:text-xl  text-[#e7d2f9] ">Fullstack Developer</h3>
        <div className="text-sm font-bold mt-5 sm:mt-7 text-zinc-400 ">Contact with me, here are my socials</div>
        <SocialSet />
      </div>
    </>
  )
}
