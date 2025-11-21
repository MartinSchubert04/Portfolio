import { moon, speakerSlash } from "@assets/index"

export const Nav = () => {
  return (
    <div className="nav-container fixed p-4 flex z-10 w-full justify-center bg-linear-to-b from-[#06030a]/90 via-[#06030a]/80 to-transparent  backdrop-blur-sm border-b border-transparent [border-image:linear-gradient(to_right,transparent,#362843,#362843,transparent)_1] matsu_nav matsu_border">
      <nav className="nav ">
        <button className="theme-button">
          <img src={moon} className="moon-icon" />
        </button>
        <button className="speaker-button">
          <img src={speakerSlash} className="speaker-icon" />
        </button>
      </nav>
    </div>
  )
}
