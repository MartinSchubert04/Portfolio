import "./Home.css"
import { Nav } from "@components/Nav/Nav.component"

export const Home = () => {
  return (
    <main className="wrapper">
      <Nav />

      <div className="ripple bg-[#c5c5c521] dark:bg-[#4b267b21]"></div>
      <div className="ripple bg-[#c5c5c521] dark:bg-[#4b267b21]"></div>
      <div className="ripple bg-[#c5c5c521] dark:bg-[#4b267b21]"></div>

      <section className="main-content-container">
        <div className="main-content">
          <div className="carreer-header">
            <h1 className="text-primarytext text-3xl sm:text-4xl  moveUpAni">
              Martin Schubert
            </h1>
            <h3>Fullstack Developer</h3>
          </div>
        </div>
      </section>
    </main>
  )
}
