import algoQuePedir from "@/assets/projects/algoQuePedir-color.webp"
import booklibre from "@/assets/projects/booklibre-color.webp"
import nn from "@/assets/projects/nn-color.webp"
import pong from "@/assets/projects/pong-color.webp"
import signpoint from "@/assets/projects/signpoint-color.webp"
import spaceStation from "@/assets/projects/space-station-color.webp"

export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  sourceLink: string
  webLink?: string
  image: string
}

// Screenshots are 640x400. The grid in Projects.tsx pairs them two per row, so keep the count even.
export const projects: Project[] = [
  {
    id: "space-station",
    name: "Space Station",
    description: "Real time solar system, Earth satellites and exoplanets from NASA public APIs, in a retro style.",
    stack: ["React", "TypeScript", "Three.js"],
    sourceLink: "https://github.com/MartinSchubert04/space-station",
    webLink: "https://martinschubert04.github.io/space-station/",
    image: spaceStation,
  },
  {
    id: "neural-network",
    name: "Neural Network",
    description:
      "Multiclass neural network written in C++, with an interactive UI to draw digits and watch it predict.",
    stack: ["C++"],
    sourceLink: "https://github.com/MartinSchubert04/NN",
    image: nn,
  },
  {
    id: "algo-que-pedir",
    name: "Algo que pedir",
    description:
      "Food ordering app for Algorithms II and III at UNSAM. Svelte and React frontends over a Kotlin REST API with Spring Boot, JPA and PostgreSQL.",
    stack: ["Svelte", "React", "TypeScript", "Kotlin", "Spring Boot", "PostgreSQL"],
    sourceLink: "https://github.com/MartinSchubert04/algoQuePedir-client",
    image: algoQuePedir,
  },
  {
    id: "booklibre",
    name: "Book libre",
    description:
      "Book lending app. React and TypeScript frontend, and a Kotlin REST API with Spring Boot and JPA on PostgreSQL and MongoDB.",
    stack: ["React", "TypeScript", "Kotlin", "Spring Boot", "PostgreSQL", "MongoDB"],
    sourceLink: "https://github.com/MartinSchubert04/Booklibre",
    image: booklibre,
  },
  {
    id: "signpoint",
    name: "Signpoint",
    description: "Automated Outlook and Gmail signatures.",
    stack: ["React", "TypeScript", "Python"],
    sourceLink: "https://github.com/MartinSchubert04/Signpoint",
    image: signpoint,
  },
  {
    id: "mobile-pong",
    name: "Mobile Pong",
    description: "Mobile game made in C++.",
    stack: ["C++", "Android Studio"],
    sourceLink: "https://github.com/MartinSchubert04/Pong",
    image: pong,
  },
]

export const PROJECT_IMAGE_SIZE = { width: 640, height: 400 }
