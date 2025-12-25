import { useState, useEffect } from "react";

import { getExpiringSoonProducts } from "../../services/multiStockApi.js";
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit/index.jsx";
import PaginationComponent from "../../components/PaginationComponent/index.jsx";
import DaysFilterComponent from "../../components/FilterDayComponent/index.jsx";
import ProductListCardComponent from "../../components/ProductsListCard/index.jsx";

export default function ProductExpirationDatesPage() {

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
    }, [days, page,]);

    return (
        <div className="container mt-3 mt-md-4">
            <DaysFilterComponent days={days} onDaysChange={(newDays) => {
                setPage(1);
                setDays(newDays);
            }} />

            <div className="row g-3 mt-2">
                {!loading && products.map(product => (
                    <ProductListCardComponent
                        key={product._id}
                        product={product}
                        onClick={(product) => setSelectedProduct(product)}
                    />
                ))}
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
    )
}