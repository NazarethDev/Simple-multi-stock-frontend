import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TopExpiredProductsComponet({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="card shadow-sm border-info">
            <div className="card-header bg-info text-white fw-bold">
                Top 10 Produtos com Maior Volume de Vencimento
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {/* layout="vertical" transforma o gráfico em horizontal */}
                        <BarChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />

                            {/* O Eixo X agora mostra os valores (quantidades) */}
                            <XAxis type="number" />

                            {/* O Eixo Y agora mostra os nomes (type="category") */}
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={90}
                                style={{ fontSize: '12px', fontWeight: 'bold' }}
                            />

                            <Tooltip
                                formatter={(value) => [`${value} unidades`, "Perda Total"]}
                            />

                            <Bar
                                dataKey="quantity"
                                fill="#0dcaf0"
                                radius={[0, 4, 4, 0]}
                                barSize={25}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

}