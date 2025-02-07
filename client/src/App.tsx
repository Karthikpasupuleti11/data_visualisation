import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { DataStructures } from "./pages/DataStructures"
import { Algorithms } from "./pages/Algorithms"
import { Visualizations } from "./pages/Visualizations"
import { Settings } from "./pages/Settings"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
        <Route path="/" element={<DataStructures />} />
          <Route path="data-structures" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="algorithms" element={<Algorithms />} />
            <Route path="visualizations" element={<Visualizations />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App