import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TopExpiredProductsComponent({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="card shadow-sm border-info">
            <div className="card-header bg-info text-white fw-bold">
                Top 10 Produtos com Maior Volume de Vencimento
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />

                            <XAxis type="number" hide />

                            <YAxis
                                dataKey="name"
                                type="category"
                                width={90}
                                tick={{ fill: '#0dcaf0', fontSize: '12px', fontWeight: 'bold' }}
                            />

                            <Tooltip
                                formatter={(value) => [`${value} unidades`, "Perda Total"]}
                                labelStyle={{ color: "black" }}
                                cursor={{ fill: 'transparent' }}
                            />

                            <Bar
                                dataKey="quantity"
                                fill="#0dcaf0"
                                radius={[0, 4, 4, 0]}
                                barSize={25}
                                style={{ cursor: 'pointer' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}