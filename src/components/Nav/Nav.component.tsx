import { moon, sun, speakerSlash, speaker, backgroundMusic, clickSound } from "@assets/index"
import "./Nav.css"
import { useState, useEffect, useRef } from "react"

export const Nav = () => {
  const [theme, setTheme] = useState(typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark")
  const [themeIcon, setThemeIcon] = useState(theme === "dark" ? moon : sun)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speakerIcon, setSpeakerIcon] = useState(speakerSlash)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    const clickSound = clickRef.current
    if (!clickSound) return

    clickSound.currentTime = 0

    setTheme(newTheme)
    clickSound?.play()
    setThemeIcon(theme === "dark" ? sun : moon)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const html = document.documentElement
    if (theme === "light") {
      html.classList.add("light")
    } else {
      html.classList.remove("light")
    }
  }, [theme])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setSpeakerIcon(speakerSlash)
    } else {
      // Si está pausado, intentar reproducir
      audio.play().catch((error) => {
        console.warn("Autoplay bloqueado. El usuario debe interactuar con la página primero.", error)
      })
      setIsPlaying(true)
      setSpeakerIcon(speaker)
    }
  }

  return (
    <div
      className="nav-container fixed p-4 flex z-10 w-full justify-center 
      bg-linear-to-b from-(--color-nav-gradient)/90 via-(--color-nav-gradient)  /80 to-transparent  
      backdrop-blur-sm border-b border-transparent [border-image:linear-gradient(to_right,transparent,var(--color-border-secondary),var(--color-border-secondary),transparent)_1] "
    >
      <nav className="nav ">
        <button className="theme-button" onClick={toggleTheme}>
          <img src={themeIcon} className="moon-icon" />
          <audio ref={clickRef} src={clickSound} />
        </button>
        <button className="speaker-button" onClick={toggleMusic}>
          <img src={speakerIcon} className="speaker-icon" />
          <audio ref={audioRef} src={backgroundMusic} loop />
        </button>
      </nav>
    </div>
  )
}
