export default function BarcodeSearch({
    eanCode,
    onChange,
    onSearch,
    onReadBarcode,
    loading,
    showCamera,
}) {
    return (
        <>
            {/* INPUT */}
            <div className="row g-2">
                <div className="col-12">
                    <label className="form-label">Código de barras</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite ou leia o código"
                        value={eanCode}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>

                <div className="col-12 d-flex gap-2">
                    <button
                        className="btn btn-primary flex-fill"
                        onClick={onSearch}
                        disabled={loading}
                    >
                        {loading ? "Buscando..." : "Buscar"}
                    </button>

                    <button
                        className="btn btn-secondary flex-fill"
                        onClick={onReadBarcode}
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
        </>
    );
}
