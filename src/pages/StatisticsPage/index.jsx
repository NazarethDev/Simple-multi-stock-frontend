import { useState, useEffect } from "react";

import { findFinanceLosses, findExpiredProductsByStore } from "../../services/multiStockApi.js";
import FilterMonthsComponent from "../../components/FilterMonthsComponent/index.jsx"
import FinanceLossesComponent from "../../components/FinanceLossesComponent/index.jsx"

export default function StatisticsPage() {
    const [months, setMonths] = useState(1)
    const [loading, setLoading] = useState(false);
    const [financeData, setFinanceData] = useState(null);
    const [quantityByStore, setQuantityByStore] = useState(null);

    async function fetchData(months) {
        try {
            setLoading(true);
            const finance = await findFinanceLosses(months);

            setFinanceData(finance);

        } catch (error) {
            console.error(`Erro ao buscar dados: ${error}`);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(months);
    }, [months])

    return (
        <div className="container mt-4 px-0">
            <h1 className="mb-4">Estatísticas de Inventário</h1>

            <FilterMonthsComponent
                months={months}
                onMonthsChange={setMonths}
            />

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-danger" role="status"></div>
                    <p>Carregando estatísticas...</p>
                </div>
            ) : (
                <>
                    {/* Renderização Condicional: Só mostra se financeData existir */}
                    {financeData && <FinanceLossesComponent data={financeData} />}

                    {/* Aqui você adicionaria o componente de quantidade futuramente */}
                    {/* productsData && <ProductsQuantityComponent data={productsData} /> */}
                </>
            )}
        </div>
    )
}