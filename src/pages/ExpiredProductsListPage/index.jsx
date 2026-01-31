import { useState, useEffect } from "react";

import ProductListCardComponent from "../../components/ProductsListCardComponent/index.jsx";
import { getExpiredProducts } from "../../services/multiStockApi.js";
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit/index.jsx";
import PaginationComponent from "../../components/PaginationComponent/index.jsx";
import DaysFilterComponent from "../../components/FilterDayComponent/index.jsx";

export default function ExpiredProductsListPage() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [days, setDays] = useState(7);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    async function fetchProducts() {
        try {
            setLoading(true);

            const response = await getExpiredProducts({
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
    }, [days, page,]);

    return (
        <div className="container mt-3 mt-md-4">
            <DaysFilterComponent days={days} onDaysChange={(newDays) => {
                setPage(1);
                setDays(newDays);
            }} />

            <div className="row g-3 mt-2">
                {loading ? (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-2 text-muted">Consultando histórico de vencimentos...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductListCardComponent
                            key={product._id}
                            product={product}
                            onClick={(product) => setSelectedProduct(product)}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center py-5 border rounded bg-light">
                        <i className="bi bi-box-seam fs-1 text-muted"></i>
                        <h5 className="mt-3 text-muted">Nenhum produto expirado nos últimos {days} dias.</h5>
                    </div>
                )}
            </div>

            <PaginationComponent
                currentPage={page}
                totalPages={pagination?.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
            {selectedProduct && (
                <ProductCardComponentEdit
                    product={selectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        fetchProducts()
                    }}
                />
            )

            }
        </div>
    );

}