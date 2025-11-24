import "./Home.css"
import { Nav } from "@components/Nav/Nav.component"
import { Header } from "@components/Header/Header.component"
import { SkillSet } from "@components/Skills/Skills.component"
import { ProyectSet } from "@components/Proyect/Proyect.component"

export const Home = () => {
  return (
    <main className="wrapper">
      <Nav />
      <section className="main-content-container">
        <div className="main-content">
          <Header />
          <SkillSet />
          <ProyectSet />
        </div>
      </section>
    </main>
  )
}
