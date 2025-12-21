import { useState, useEffect } from "react";

import { getExpiringSoonProducts } from "../../services/multiStockApi.js";
import { ProductCardComponentEdit } from "../../components/ProductCardComponentEdit/index.jsx";
import { PaginationComponent } from "../../components/PaginationComponent/index.jsx";
import { DaysFilterComponent } from "../../components/FilterDayComponent/index.jsx";


export default function ExpiringSoonPage() {

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [days, setDays] = useState(7);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    async function fetchProducts() {
        try {
            setLoading(true);

            const response = await getExpiringSoonProducts({
                days,
                page,
                limit: 20
            });

            setProducts(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Erro ao buscar produtos: ", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [days, page]);

    return (
        <div className="container mt-4">

            <h4 className="mb-4">
                Verificar validades próximas
            </h4>

            <DaysFilterComponent />

            {loading && <p>Carregando...</p>}

            {!loading && products.map(product => (
                <div key={product._id} className="card mb-3 shadow-sm">
                    <div className="card-body">

                        <div className="d-flex justify-content-between">
                            <strong>{product.name}</strong>
                            <span className="text-danger">
                                {new Date(product.expiresAt).toLocaleDateString()}
                            </span>
                        </div>

                        <hr />

                        <div>
                            <small className="text-muted">Estoque por loja</small>

                            {Object.entries(product.quantity).length === 0 ? (
                                <div className="text-muted mt-1">
                                    Sem estoque cadastrado
                                </div>
                            ) : (
                                <div className="mt-2">
                                    {Object.entries(product.quantity).map(
                                        ([store, qty]) => (
                                            <div
                                                key={store}
                                                className="d-flex justify-content-between"
                                            >
                                                <span>{store}</span>
                                                <strong>{qty}</strong>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            ))}

            {selectedProduct && (
                <ProductCardComponentEdit
                    product={selectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        fetchProducts();
                    }}
                />
            )}

            <PaginationComponent
                currentPage={page}
                totalPages={pagination?.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />

        </div>
    );
}