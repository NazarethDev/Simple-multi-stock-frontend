import { useEffect, useState } from "react";
import { updateProduct } from "../../services/multiStockApi.js";
import { getExpirationStyle } from "../../utils/expirationStyle.js"


export default function ProductCardComponentEdit({ product, onClose }) {
    const expirationStyle = getExpirationStyle(product.expiresAt);

    const [quantities, setQuantities] = useState({ ...product.quantity });

    function handleQuantityChange(store, value) {
        setQuantities(prev => ({
            ...prev,
            [store]: Number(value)
        }));
    }

    useEffect(() => {
        setQuantities({ ...product.quantity });
    }, [product])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateProduct(product._id, {
                quantities: quantities
            });
            console.log("produto enviado:", product)
            onClose();
        } catch (error) {
            alert("Erro ao atualizar quantidades");
            console.log("produto enviado", product)
        }
    }

    useEffect(() => {
        document.body.classList.add("modal-open");
        document.body.style.overflow = "hidden";

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.overflow = "";
        }
    })

    return (
        <>
            < div className="modal-backdrop fade show" onClick={onClose} />
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className={`modal-title ${expirationStyle.text}`}>{product.name}</h5>
                            <button className="btn-close" onClick={onClose} />
                        </div>

                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                                <div className={`col-6 ${expirationStyle.text}`}>
                                    <strong>Cód. barras:</strong> {product.eanCode}
                                </div>
                                <div className={`col-6 ${expirationStyle.text}`}>
                                    <strong>Custo do produto:</strong>   {Number(product.cost).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </div>

                            </div>
                            <div className="d-flex justify-content gap-2">
                                <div className="col-12">
                                    <strong className={`${expirationStyle.text}`}>Validade: </strong>
                                    <p className={`${expirationStyle.text}`}>{new Date(product.expiresAt).toLocaleDateString()}</p>

                                </div>
                            </div>

                            <hr />
                            <h6>Quantidade por loja</h6>

                            <ul className="list-unstyled">
                                {Object.entries(quantities).map(([store, qty]) => (
                                    <li key={store} className="d-flex align-items-center justify-content-between gap-2 mb-2">
                                        <div className="col-6">
                                            <strong>{store}:</strong>
                                        </div>
                                        <div className="col-6">
                                            <input
                                                type="number"
                                                className="form-control w-50"
                                                min={0}
                                                value={qty}
                                                onChange={(e) =>
                                                    handleQuantityChange(store, e.target.value)
                                                }
                                            />
                                        </div>

                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul className="list-unstyled">
                                <li className="d-flex align-items-center justify-content-between gap-2 mb-2">
                                    <div className={`col-6 ${expirationStyle.text}`}>
                                        <strong>Quantidade total: </strong>
                                    </div>
                                    <div className={`col-6 ${expirationStyle.text}`}>
                                        {product.totalQuantity}
                                    </div>
                                </li>
                                <li className="d-flex align-items-center justify-content-between gap-2 mb-2">
                                    <div className={`col-6 ${expirationStyle.text}`}>
                                        <strong>Custo total: </strong>
                                    </div>
                                    <div className={`col-6 ${expirationStyle.text}`}>
                                        {Number(product.totalCost).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </div>
                                </li>
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
        </>
    );
}
