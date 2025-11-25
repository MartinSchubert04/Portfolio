import "./App.css"
import { AppRouter } from "./routes"
import { ToastContainer } from "@components/Toast/ToastContainer"
import * as Tooltip from "@radix-ui/react-tooltip"

function App() {
  return (
    <div className="App">
      <Tooltip.Provider>
        <AppRouter />
        <ToastContainer />
      </Tooltip.Provider>
    </div>
  )
}

export default App
