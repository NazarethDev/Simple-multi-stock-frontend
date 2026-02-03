import { useState, useEffect } from "react";

import { findFinanceLosses, findExpiredProductsByStore } from "../../services/multiStockApi.js";
import FilterMonthsComponent from "../../components/FilterMonthsComponent/index.jsx";
import FinanceLossesComponent from "../../components/FinanceLossesComponent/index.jsx";
import ProductsLossesComponent from "../../components/ProductsLossesComponent/index.jsx";

export default function StatisticsPage() {
    const [months, setMonths] = useState(1)
    const [loading, setLoading] = useState(false);
    const [financeData, setFinanceData] = useState(null);
    const [quantityByStore, setQuantityByStore] = useState(null);

    async function fetchData(selectedMonths) {
        try {
            setLoading(true);
            // Use nomes diferentes aqui para não confundir com os nomes do useState
            const [resFinance, resQuantity] = await Promise.all([
                findFinanceLosses(selectedMonths),
                findExpiredProductsByStore(selectedMonths)
            ]);

            setFinanceData(resFinance);
            setQuantityByStore(resQuantity);

        } catch (error) {
            console.error(`Erro ao buscar dados: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(months);
    }, [months])

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Estatísticas de Inventário</h1>

            <div className="mb-4">
                <FilterMonthsComponent months={months} onMonthsChange={setMonths} />
            </div>

            {!loading && (
                <div className="row g-4">
                    <div className="col-12">
                        {financeData ? <FinanceLossesComponent data={financeData} /> : <p>Sem dados financeiros.</p>}
                    </div>
                    <div className="col-12">
                        {/* Remova a condicional estrita para testar se o componente monta */}
                        <ProductsLossesComponent data={quantityByStore} />
                    </div>
                </div>
            )}
        </div>
    )
}