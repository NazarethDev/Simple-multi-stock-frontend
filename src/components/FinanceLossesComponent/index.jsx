import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FinanceLossesComponent({ data }) {

    if(!data || !data.byStore) return null;

    const chartData = Object.keys(data.byStore).map(store => ({
        name: store,
        value: data.byStore[store]
    }));

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Card do Total Geral */}
                <div className="col-md-4">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-header">Prejuízo Total</div>
                        <div className="card-body">
                            <h2 className="card-title">R$ {data.totalLosted}</h2>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Barras */}
                <div className="col-md-8" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#dc3545" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}