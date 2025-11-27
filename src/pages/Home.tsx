import "./Home.css"
import { Nav } from "@components/Nav/Nav.component"
import { Header } from "@components/Header/Header.component"
import { SkillSet } from "@components/Skills/Skills.component"
import { ProjectSet } from "@components/Project/Project.component"
import { CareerNav } from "@components/Career/CareerNav.component"
import { ParticleBackground } from "@utils/ParticlesBackground"
import { Contributions } from "@components/Contributions/Contributions.component"
import { Title } from "@components/SectionTitle/SectionTitle"

export const Home = () => {
  return (
    <main className="wrapper">
      <Nav />
      <section className="main-content-container">
        <ParticleBackground />

        <div className="main-content">
          <Header />
          <div className="px-3">
            <Title sectionAhead="So far" title="Career" />
          </div>
          <CareerNav />
          <SkillSet />
          <ProjectSet />
          <Contributions />
        </div>
      </section>
    </main>
  )
}
