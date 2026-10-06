import { Component, type ReactNode } from "react"

/** The 3D scene is decoration: if WebGL is missing or a model fails to load, the page goes on without it. */
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
