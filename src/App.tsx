import "./App.css"
import { AppRouter } from "./routes"
import { ToastContainer } from "@components/Toast/ToastContainer"

function App() {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer />
    </div>
  )
}

export default App
