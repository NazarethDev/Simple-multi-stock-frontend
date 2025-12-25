import { useState } from "react";
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit/index.jsx";
import ProductListCardComponent from "../../components/ProductsListCard/index.jsx";
import getEanCode from "../../services/eanCodeScan.js";
import { findByBarCode } from "../../services/multiStockApi.js";

export default function FindProductByBarCode() {
    const [eanCode, setEanCode] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    async function handleReadBarcode() {
        try {
            setShowCamera(true);

            // pequeno delay para garantir que o <video> entrou no DOM
            setTimeout(async () => {
                const ean = await getEanCode("video");
                setEanCode(ean);
                setShowCamera(false);
                await handleSearch(ean);
            }, 300);

        } catch (error) {
            console.error("Erro ao ler código de barras:", error);
            alert("Não foi possível ler o código de barras");
            setShowCamera(false);
        }
    }

    async function handleSearch(code = eanCode) {
        if (!code) return;

        try {
            setLoading(true);
            setSelectedProduct(null);

            const response = await findByBarCode(code);
            setProducts(response.data);
        } catch (error) {
            setProducts([]);
            alert("Produto não encontrado");
        } finally {
            setLoading(false);
        }
    }

    function handleSelectProduct(product) {
        setSelectedProduct(product);
    }

    return (
        <div className="container mt-4">
            {/* INPUT */}
            <div className="row g-2">
                <div className="col-12">
                    <label className="form-label">Código de barras</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite ou leia o código"
                        value={eanCode}
                        onChange={(e) => setEanCode(e.target.value)}
                    />
                </div>

                <div className="col-12 d-flex gap-2">
                    <button
                        className="btn btn-primary flex-fill"
                        onClick={() => handleSearch()}
                        disabled={loading}
                    >
                        {loading ? "Buscando..." : "Buscar"}
                    </button>

                    <button
                        className="btn btn-secondary flex-fill"
                        onClick={handleReadBarcode}
                    >
                        Ler código
                    </button>
                </div>
            </div>

            {/* CÂMERA */}
            {showCamera && (
                <div className="mt-3">
                    <video
                        id="video"
                        className="w-100 rounded border"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                        autoPlay
                        muted
                    />
                    <small className="text-muted d-block mt-1">
                        Aponte a câmera para o código de barras
                    </small>
                </div>
            )}

            {/* LISTA */}
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

            {/* EDIÇÃO */}
            {selectedProduct && (
                <div className="mt-4">
                    <ProductCardComponentEdit
                        product={selectedProduct}
                        onClose={ async () => {
                            setSelectedProduct(null);
                            await handleSearch();
                        }}
                    />
                </div>
            )}
        </div>
    );
}
