import { lazy, Suspense, useState } from "react"
import { Activity } from "@/components/Activity"
import { Career } from "@/components/Career"
import { Contact } from "@/components/Contact"
import { CrtOverlay } from "@/components/CrtOverlay"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { SceneBoundary } from "@/components/SceneBoundary"
import { SketchDefs } from "@/components/SketchDefs"
import { Skills } from "@/components/Skills"
import { StatusBar } from "@/components/StatusBar"
import { TopBar } from "@/components/TopBar"
import { useActiveSection } from "@/hooks/useActiveSection"
import { GithubProvider } from "@/hooks/useGithub"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// three.js is most of the bundle; the page is readable before it arrives.
const SpaceScene = lazy(() => import("@/scene/SpaceScene"))

export function App() {
  const active = useActiveSection()
  const reducedMotion = useReducedMotion()
  // The scene and the orbit map loop for as long as the page is open, so the visitor can stop them
  const [paused, setPaused] = useState(false)
  const still = reducedMotion || paused

  return (
    <GithubProvider>
      <a
        href="#main"
        className="fixed top-2 left-2 z-(--z-index-skip) -translate-y-20 rounded-full bg-amber px-4 py-2 text-hull focus-visible:translate-y-0"
      >
        Skip to Content
      </a>
      <SketchDefs />
      <SceneBoundary>
        <Suspense fallback={null}>
          <SpaceScene section={active} still={still} />
        </Suspense>
      </SceneBoundary>
      <TopBar active={active} />
      <main id="main">
        <Hero />
        <Career />
        <Skills animate={!still} />
        <Projects />
        <Activity />
        <Contact />
      </main>
      <StatusBar
        active={active}
        paused={still}
        onTogglePaused={reducedMotion ? undefined : () => setPaused((value) => !value)}
      />
      <CrtOverlay still={still} />
    </GithubProvider>
  )
}
