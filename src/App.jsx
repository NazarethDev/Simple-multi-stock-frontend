import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/AppRoutes.jsx"
import HeaderComponent from "./components/HeaderComponent/index.jsx"
import FooterComponent from "./components/FooterComponent/index.jsx"

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <HeaderComponent />
      <main className="container-fluid pt-5 mt-3 min-vh-100">
        <AppRoutes />
      </main>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
