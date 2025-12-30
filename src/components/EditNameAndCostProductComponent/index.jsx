import { useState, useEffect } from "react";
import { updateNameAndCost } from "../../services/multiStockApi.js";
import { getExpirationStyle } from "../../utils/expirationStyle.js";

export default function UpdateNameAndCostCardComponent({ product, onClose }) {
    const expirationStyle = getExpirationStyle(product.expiresAt);

    const [name, setName] = useState(product.name);
    const [cost, setCost] = useState(product.cost);
    const [expiresAt, setExpiresAt] = useState(
        product.expiresAt ? product.expiresAt.split("T")[0] : "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(product.name);
        setCost(product.cost);
        setExpiresAt(product.expiresAt.slice(0, 10));
    }, [product]);

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            productName,
            productCost,
            expiresAt: expiresAt
                ? new Date(expiresAt).toISOString() : null,
        }

        try {
            setLoading(true);

            await updateNameAndCost(product._id, payload);

            onClose();
        } catch (error) {
            alert("Erro ao atualizar produto");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose} />

            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <form className="modal-content" onSubmit={handleSubmit}>

                        {/* HEADER */}
                        <div className="modal-header">
                            <h5 className={`modal-title ${expirationStyle.text}`}>
                                Editar produto
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose} />
                        </div>

                        {/* BODY */}
                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">Nome do produto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Custo unitário</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min={0}
                                    step="0.01"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Data de vencimento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={expiresAt}
                                    onChange={(e) => setExpiresAt(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Salvando..." : "Salvar"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
