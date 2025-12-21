import { Routes, Route } from "react-router-dom";

import ExpiringSoonPage from "../pages/ExpiringSoonPage/index.jsx";
import InitialPage from "../pages/InitialPage/index.jsx";
import NewProductsPage from "../pages/NewProductsPage/index.jsx";
import ProductsListPage from "../pages/ProductsListPage/index.jsx";
import StatisticsPage from "../pages/StatisticsPage/index.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/expira-breve" element={<ExpiringSoonPage />} />
            <Route path="/novo-produto" element={<NewProductsPage />} />
            <Route path="/lista-de-produtos" element={<ProductsListPage />} />
            <Route path="/estatisticas" element={<StatisticsPage />} />
        </Routes>
    )
}