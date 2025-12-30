import { getExpirationStyle } from "../../utils/expirationStyle.js"

export default function ProductListCardComponent({ product, onClick }) {
    const expirationStyle = getExpirationStyle(product.expiresAt);

    return (
        <div className="col-12">
            <div
                className={`card shadow-sm h-100 border-2 ${expirationStyle.border} cursor-pointer w-100`}
                role="button"
                onClick={() => onClick(product)}
            >
                <div className="card-body">

                    {/* Título + data */}
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                        <strong
                            className={`mb-1 mb-sm-0 ${expirationStyle.text} text-truncate`}
                        >
                            {product.name}
                        </strong>

                        <strong
                            className={`small ${expirationStyle.text}`}
                        >
                            {new Date(product.expiresAt).toLocaleDateString()}
                        </strong>
                    </div>

                    <hr className="my-2 my-md-3" />

                    {/* Estoque */}
                    <div>
                        <small className="text-muted">
                            Estoque por loja
                        </small>

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
                    <hr className="my-2 my-md-3" />
                    <div className="mt-1 d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong>{product.totalQuantity}</strong>
                    </div>
                    <div className="mt-1 d-flex justify-content-between">
                        <strong>Custo total:</strong>
                        <strong>  {Number(product.totalCost).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}</strong>
                    </div>

                </div>
            </div>
        </div>
    );
}