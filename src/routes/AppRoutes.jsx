import { Routes, Route } from "react-router-dom";

import ProductExpirationDatesPage from "../pages/ProductExpirationDatesPage/index.jsx";
import InitialPage from "../pages/InitialPage/index.jsx";
import NewProductsPage from "../pages/NewProductsPage/index.jsx";
import StatisticsPage from "../pages/StatisticsPage/index.jsx";
import FindProductByBarCode from "../pages/FindProductByBarCodePage/index.jsx";
import UpdateNameAndCostPage from "../pages/UpdateNameAndCostPage/index.jsx";
import ExpiredProductsListPage from "../pages/ExpiredProductsListPage/index.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/lista-de-validades" element={<ProductExpirationDatesPage />} />
            <Route path="/novo-produto" element={<NewProductsPage />} />
            <Route path="/estatisticas" element={<StatisticsPage />} />
            <Route path="/procurar-por-codigo" element={<FindProductByBarCode />} />
            <Route path="/atualizar-dados-base" element={<UpdateNameAndCostPage />} />
            <Route path="/produtos-vencidos" element={<ExpiredProductsListPage />} />
        </Routes>
    )
}