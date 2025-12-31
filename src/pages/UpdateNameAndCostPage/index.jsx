import { useState } from "react";
import UpdateNameAndCostCardComponent from "../../components/EditNameAndCostProductComponent/index.jsx";
import ProductListCardComponent from "../../components/ProductsListCardComponent";
import BarCodeSearch from "../../components/BarCodeSearch/index.jsx";
import { useBarCodeSearchService } from "../../services/useBarCodeSearchService";

export default function UpdateNameAndCostPage() {
    const {
        eanCode,
        setEanCode,
        products,
        loading,
        showCamera,
        handleReadBarcode,
        handleSearch,
    } = useBarCodeSearchService();

    const [selectedProduct, setSelectedProduct] = useState(null);

    function handleSelectProduct(product) {
        setSelectedProduct(product);
    }

    async function handleUpdated() {
        setSelectedProduct(null);
        await handleSearch();
    }

    return (
        <div className="container mt-4">
            <BarCodeSearch
                eanCode={eanCode}
                onChange={setEanCode}
                onSearch={() =>
                    handleSearch().catch(() =>
                        alert("Produto não encontrado")
                    )
                }
                onReadBarcode={handleReadBarcode}
                loading={loading}
                showCamera={showCamera}
            />

            {!selectedProduct && products.length > 0 && (
                <div className="mt-4">
                    <h6 className="mb-3">Produtos encontrados</h6>

                    <div className="d-flex flex-column gap-2">
                        {products.map((product) => (
                            <ProductListCardComponent
                                key={product._id}
                                product={product}
                                onClick={() => handleSelectProduct(product)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {selectedProduct && (
                <div className="mt-4">
                    <UpdateNameAndCostCardComponent
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onUpdated={handleUpdated}
                    />
                </div>
            )}
        </div>
    );
}