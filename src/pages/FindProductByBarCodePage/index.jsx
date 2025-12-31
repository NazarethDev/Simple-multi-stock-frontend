import { useState } from "react";
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit";
import ProductListCardComponent from "../../components/ProductsListCardComponent";
import BarcodeSearch from "../../components/BarCodeSearch/index.jsx";
import { useBarcodeSearch } from "../../utils/useBarCodeSearch.js";

export default function FindProductByBarCode() {
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

            {/* LISTA */}
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

            {/* EDIÇÃO */}
            {selectedProduct && (
                <div className="mt-4">
                    <ProductCardComponentEdit
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
