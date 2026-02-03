import { useState, useEffect } from "react";

import { findFinanceLosses, findExpiredProductsByStore, findTopExpiredQuantities } from "../../services/multiStockApi.js";
import FilterMonthsComponent from "../../components/FilterMonthsComponent/index.jsx";
import FinanceLossesComponent from "../../components/FinanceLossesComponent/index.jsx";
import ProductsLossesComponent from "../../components/ProductsLossesComponent/index.jsx";
import TopExpiredProductsComponet from "../../components/TopExpiredProductsComponet/index.jsx";

export default function StatisticsPage() {
    const [months, setMonths] = useState(1)
    const [loading, setLoading] = useState(false);
    const [financeData, setFinanceData] = useState(null);
    const [quantityByStore, setQuantityByStore] = useState(null);
    const [topQuantities, setTopquantities] = useState(null)

    async function fetchData(selectedMonths) {
        try {
            setLoading(true);
            const [resFinance, resQuantity, resTopQuantities] = await Promise.all([
                findFinanceLosses(selectedMonths),
                findExpiredProductsByStore(selectedMonths),
                findTopExpiredQuantities(selectedMonths)
            ]);

            setFinanceData(resFinance);
            setQuantityByStore(resQuantity);
            setTopquantities(resTopQuantities);

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
                        <ProductsLossesComponent data={quantityByStore} />
                    </div>
                    <div className="col-12">
                        <TopExpiredProductsComponet data={topQuantities} />
                    </div>
                </div>
            )}
        </div>
    )
}