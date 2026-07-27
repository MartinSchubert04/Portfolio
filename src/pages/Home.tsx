import "./Home.css"
import { Nav } from "@components/Nav/Nav.component"
import { Header } from "@components/Header/Header.component"
import { SkillSet } from "@components/Skills/Skills.component"
import { ProjectSet } from "@components/Project/Project.component"
import { CareerNav } from "@components/Career/CareerNav.component"
import { Contributions } from "@components/Contributions/Contributions.component"
import { Title } from "@components/SectionTitle/SectionTitle"
import { SpaceScene } from "@components/SpaceScene/SpaceScene.component"

export const Home = () => {
  return (
    <main className="wrapper">
      <Nav />
      <SpaceScene />
      <section className="main-content-container">
        <div className="main-content">
          <Header />
          <div className="px-3 mt-6">
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
