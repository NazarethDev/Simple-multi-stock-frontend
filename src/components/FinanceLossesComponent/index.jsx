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

    return (<div className="container mt-4">
        <div className="row">
            {/* Card do Total Geral */}
            <div className="col-md-4">
                <div className="card text-white bg-danger mb-3">
                    <div className="card-header">Prejuízo Total</div>
                    <div className="card-body">
                        <h2 className="card-title">{formatCurrency(data.totalLosted)}</h2>
                    </div>
                </div>
            </div>

            {/* Gráfico de Barras */}
            <div className="col-md-8" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        {/* tickFormatter ajusta os valores que aparecem na lateral do gráfico */}
                        <YAxis tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />

                        {/* formatter ajusta o valor dentro do balão (Tooltip) ao passar o mouse */}
                        <Tooltip
                            formatter={(value) => [formatCurrency(value),]}
                            labelStyle={{ color: "black" }}
                        />

                        <Bar dataKey="value" fill="#dc3545" name="Prejuízo" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
    )
}