import resume from "@/assets/MartinSchubert.pdf?url"
import { GITHUB_PROFILE } from "@/lib/github"

export const site = {
  name: "Martin Schubert",
  role: "Fullstack Developer",
  pitch: "Fullstack developer in Buenos Aires. I build web apps end to end, and neural networks in C++ for fun.",
  resume,
  resumeFileName: "MartinSchubert.pdf",
  linkedin: "https://www.linkedin.com/in/martin-schubert-44b842240/",
  github: GITHUB_PROFILE,
}

// Order here is the order on the page. The status bar reports the position, and the 3D scene
// (src/scene/choreography.ts) keeps one pose per entry.
export const sections = [
  { id: "top", label: "Home" },
  { id: "career", label: "Career" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
  { id: "contact", label: "Contact" },
] as const

export type SectionId = (typeof sections)[number]["id"]
