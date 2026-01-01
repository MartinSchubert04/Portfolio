import { algoQuePedir, signpoint, breakout, NN } from "@assets/index"

export const projects = [
  {
    imgURL: algoQuePedir,
    name: "Algo que pedir",
    description: "Food delivery app",
    sourceLink: "https://github.com/MartinSchubert04/algoQuePedir-client",
    webLink: "",
    techStack: ["Svelte", "React", "TypeScript", "Kotlin", "Spring Boot", "HTML", "CSS"],
  },
  {
    imgURL: signpoint,
    name: "Signpoint",
    description: "Automated Outlook and Gmail signs",
    sourceLink: "https://github.com/MartinSchubert04/Signpoint",
    webLink: "",
    techStack: ["React", "TypeScript", "Python"],
  },
  {
    imgURL: NN,
    name: "Neural Network",
    description: "Multiclass NN made with Python and NumPy (no high-level ML frameworks).",
    sourceLink: "https://github.com/MartinSchubert04/Neural-Network",
    webLink: "",
    techStack: ["Python", "Numpy"],
  },
  {
    imgURL: breakout,
    name: "Breakout",
    description: "Game made in assembly",
    sourceLink: "https://github.com/MartinSchubert04/Breakout",
    webLink: "",
    techStack: ["Assembly"],
  },
]
