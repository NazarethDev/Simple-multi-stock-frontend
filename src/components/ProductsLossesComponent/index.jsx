import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductsLossesComponent({ data }) {
    // Log para depuração: Se isso não aparecer no console, o componente não foi chamado
    console.log("Dados recebidos no componente de Quantidade:", data);

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
                <div className="row">
                    <div className="col-md-3 text-center border-end">
                        <p className="text-muted mb-1">Total Geral</p>
                        <h3 className="fw-bold">{data.totalLosted?.toLocaleString('pt-BR') || 0}</h3>
                        <small className="text-muted">unidades</small>
                    </div>
                    <div className="col-md-9" style={{ minHeight: '300px' }}>
                        {/* Adicionamos debounce para evitar o erro de width(-1) */}
                        <ResponsiveContainer width="100%" height={300} debounce={50}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => [value.toLocaleString('pt-BR'), "Unidades"]} />
                                <Bar dataKey="quantidade" fill="#ffc107" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}