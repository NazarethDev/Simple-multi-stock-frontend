import { useRef } from "react";
import { useBarCodeScanner } from "../../services/useBarCodeScanner";

export default function BarcodeSearch({
    eanCode,
    onChange,
    onSearch,
    onReadBarcode,
    loading,
    showCamera,
}) {
    const videoRef = useRef(null);

    useBarCodeScanner({
        videoRef,
        enabled: showCamera,
        onDetected: (code) => {
            onChange(code);
        }
    });

    return (
        <div className="row g-2">
            <div className="col-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Digite ou leia o código de barras"
                    value={eanCode}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <div className="col-12 d-flex gap-2">
                <button
                    className="btn btn-secondary"
                    onClick={onReadBarcode}
                    disabled={loading}
                >
                    Ler código
                </button>
            </div>

            <div className="col-12 d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={onSearch}
                    disabled={loading}
                >
                    Buscar
                </button>
            </div>


            {showCamera && (
                <div className="mt-3">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{ width: "100%" }}
                    />
                </div>
            )}
        </div>
    );
}