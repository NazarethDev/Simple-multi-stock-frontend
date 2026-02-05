import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductsLossesComponent({ data }) {
    if (!data) return <div className="alert alert-warning">Aguardando dados...</div>;
    if (!data.byStore) return <div className="alert alert-danger">Erro: Estrutura byStore não encontrada.</div>;

    const chartData = Object.keys(data.byStore).map(store => ({
        name: store,
        quantidade: data.byStore[store]
    }));

    return (
        <div className="card shadow-sm border-warning">
            <div className="card-header bg-warning text-dark fw-bold">
                Distribuição de Itens Vencidos por Loja
            </div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-3 text-center border-end">
                        <p className="text-muted mb-1">Total Geral</p>
                        <h3 className="fw-bold text-warning">
                            {data.totalLosted?.toLocaleString('pt-BR') || 0}
                        </h3>
                        <small className="text-muted">unidades</small>
                    </div>

                    <div className="col-md-9" style={{ minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height={300} debounce={50}>
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" />
                                <YAxis />

                                <Tooltip
                                    formatter={(value) => [
                                        <span style={{ fontWeight: 'bold' }}>
                                            {value.toLocaleString('pt-BR')} unidades
                                        </span>,
                                        "Volume"
                                    ]}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #ffc107',
                                        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                    labelStyle={{ color: "#856404", fontWeight: "bold" }} 
                                    itemStyle={{ color: "#000" }}
                                />

                                <Bar
                                    dataKey="quantidade"
                                    fill="#ffc107"
                                    radius={[4, 4, 0, 0]}
                                    name="Unidades"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}