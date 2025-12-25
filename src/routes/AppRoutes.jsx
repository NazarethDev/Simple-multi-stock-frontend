import { Routes, Route } from "react-router-dom";

import ProductExpirationDatesPage from "../pages/ProductExpirationDatesPage/index.jsx";
import InitialPage from "../pages/InitialPage/index.jsx";
import NewProductsPage from "../pages/NewProductsPage/index.jsx";
import StatisticsPage from "../pages/StatisticsPage/index.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/lista-de-validades" element={<ProductExpirationDatesPage />} />
            <Route path="/novo-produto" element={<NewProductsPage />} />
            <Route path="/estatisticas" element={<StatisticsPage />} />
        </Routes>
    )
}