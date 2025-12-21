import { useState } from "react";
import { updateProduct } from "../../services/multiStockApi.js";

export default function ProductCardComponentEdit({ product, onClose }) {

    const [quantities, setQuantities] = useState({ ...product.quantity });

    function handleQuantityChange(store, value) {
        setQuantities(prev => ({
            ...prev,
            [store]: Number(value)
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateProduct(product._id, {
                quantity: quantities
            });
            onClose();
        } catch (error) {
            alert("Erro ao atualizar quantidades");
        }
    }

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{product.name}</h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        <p><strong>EAN:</strong> {product.eanCode}</p>
                        <p>
                            <strong>Validade:</strong>{" "}
                            {new Date(product.expiresAt).toLocaleDateString()}
                        </p>

                        <hr />
                        <h6>Quantidade por loja</h6>

                        <ul className="list-unstyled">
                            {Object.entries(quantities).map(([store, qty]) => (
                                <li key={store} className="d-flex align-items-center gap-2 mb-2">
                                    <strong>{store}:</strong>
                                    <input
                                        type="number"
                                        className="form-control w-50"
                                        min={0}
                                        value={qty}
                                        onChange={(e) =>
                                            handleQuantityChange(store, e.target.value)
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Fechar
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Salvar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
