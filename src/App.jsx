import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/AppRoutes.jsx"
import HeaderComponent from "./components/HeaderComponent/index.jsx"
import FooterComponent from "./components/FooterComponent/index.jsx"

import './App.css'

function App() {
  return (
    <BrowserRouter>
        <HeaderComponent />
        
        {/* flex-fill força o elemento a ocupar todo o espaço vertical disponível */}
        <main className="flex-fill pt-5 overflow-x-hidden">
          <AppRoutes />
        </main>

        <FooterComponent />
    </BrowserRouter>
  )
}

export default App;