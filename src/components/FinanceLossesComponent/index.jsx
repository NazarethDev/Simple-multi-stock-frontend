import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FinanceLossesComponent({ data }) {
    if (!data || !data.byStore) return null;

    const chartData = Object.keys(data.byStore).map(store => ({
        name: store,
        value: data.byStore[store]
    }));

    const formatCurrency = (value) =>
        value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    return (
        <div className="card shadow-sm border-danger">
            <div className="card-header bg-danger text-white fw-bold">
                Prejuízo Financeiro por Loja
            </div>
            <div className="card-body">
                <div className="row align-items-center">
                    {/* Resumo em texto (Lado Esquerdo) */}
                    <div className="col-md-3 text-center border-end">
                        <p className="text-muted mb-1">Prejuízo Total</p>
                        <h3 className="fw-bold text-danger">
                            {formatCurrency(data.totalLosted)}
                        </h3>
                        <small className="text-muted">Valor em estoque</small>
                    </div>

                    {/* Gráfico (Lado Direito) */}
                    <div className="col-md-9">
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%" debounce={50}>
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        tickFormatter={(value) =>
                                            `R$ ${value.toLocaleString('pt-BR', { notation: 'compact' })}`
                                        }
                                    />
                                    <Tooltip
                                        formatter={(value) => [formatCurrency(value), "Prejuízo"]}
                                        labelStyle={{ color: "black" }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#dc3545"
                                        name="Prejuízo"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}