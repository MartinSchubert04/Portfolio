import "./Home.css"
import { Nav } from "@components/Nav/Nav.component"
import { Header } from "@components/Header/Header.component"
import { SkillSet } from "@components/Skills/Skills.component"
import { ProyectSet } from "@components/Proyect/Proyect.component"
import { Carreer } from "@components/Carreer/Carreer.component"
import { ParticleBackground } from "@utils/ParticlesBackground"
import { Contributions } from "@components/Contributions/Contributions.component"

export const Home = () => {
  return (
    <main className="wrapper">
      <Nav />
      <section className="main-content-container">
        <ParticleBackground />

        <div className="main-content">
          <Header />
          <Carreer />
          <SkillSet />
          <ProyectSet />
          <Contributions />
        </div>
      </section>
    </main>
  )
}
