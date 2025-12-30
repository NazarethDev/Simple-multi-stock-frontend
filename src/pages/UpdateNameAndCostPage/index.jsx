import { useState } from "react";
import UpdateNameAndCostCardComponent from "../../components/EditNameAndCostProductComponent/index.jsx";
import ProductListCardComponent from "../../components/ProductsListCardComponent";
import BarcodeSearch from "../../components/BarcodeSearch/index.jsx";
import { useBarcodeSearch } from "../../utils/useBarCodeSearch.js";

export default function UpdateNameAndCostPage() {
    const {
        eanCode,
        setEanCode,
        products,
        loading,
        showCamera,
        handleReadBarcode,
        handleSearch,
    } = useBarcodeSearch();

    const [selectedProduct, setSelectedProduct] = useState(null);

    function handleSelectProduct(product) {
        setSelectedProduct(product);
    }

    return (
        <div className="container mt-4">
            <BarcodeSearch
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
                                onClick={() =>
                                    handleSelectProduct(product)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {selectedProduct && (
                <div className="mt-4">
                    <UpdateNameAndCostCardComponent
                        product={selectedProduct}
                        onClose={async () => {
                            setSelectedProduct(null);
                            await handleSearch();
                        }}
                    />
                </div>
            )}
        </div>
    );
}
