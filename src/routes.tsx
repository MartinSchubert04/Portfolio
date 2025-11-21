import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"

export const AppRoutes = () => (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
)

export const AppRouter = () => (
  <Router>
    <AppRoutes />
  </Router>
)
