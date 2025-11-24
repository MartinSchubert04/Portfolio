import { SocialSet } from "@components/Social/Social.component"

export const Header = () => {
  return (
    <div className="carreer-header px-3 pt-6 flex flex-col intro w-full  border-l border-r border-solid border-transparent [border-image:linear-gradient(to_bottom,#362843,transparent)_1] matsu_border_side">
      <h1 className="text-primarytext font-bold text-3xl sm:text-4xl ">Martin Schubert</h1>
      <h3 className="pt-2 text-violet-text text-md sm:text-xl  text-[#e7d2f9] ">Fullstack Developer</h3>
      <div className="text-primarytext text-2xl sm:text-2xl"> Contact</div>
      <div className="text-sm font-bold mt-5 sm:mt-7 text-zinc-400 ">Contact with me, here are my socials</div>
      <SocialSet />
    </div>
  )
}
