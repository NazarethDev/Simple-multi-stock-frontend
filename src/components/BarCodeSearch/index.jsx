import { useRef } from "react";
import { useBarCodeScanner } from "../../services/useBarCodeScanner";
import { playBeep } from "../../utils/playBeep";

export default function BarcodeSearch({
    eanCode,
    onChange,
    onSearch,
    onReadBarcode,
    loading,
    showCamera,
}) {
    const videoRef = useRef(null);
    const isScanning = useRef(true);

    useBarCodeScanner({
        videoRef,
        enabled: showCamera,
        onDetected: (code) => {
            if (!isScanning.current) return;

            isScanning.current = false;
            playBeep();
            onChange(code);

            onReadBarcode();

            setTimeout(() => {
                isScanning.current = true;
            }, 1000);
        }
    });

    return (
        <div className="row g-2">
            <div className="col-12">
                <label className="form-label text-muted small">Código EAN</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Digite ou leia o código de barras"
                    value={eanCode}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <div className="col-12 d-grid gap-2 d-md-flex">
                <button
                    type="button"
                    className={`btn ${showCamera ? 'btn-danger' : 'btn-secondary'} flex-grow-1`}
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Botão clicado! Estado atual de showCamera:", showCamera);
                        onReadBarcode();
                    }}
                    disabled={loading}
                >
                    <i className={`bi ${showCamera ? 'bi-camera-video-off' : 'bi-camera-video'} me-2`}></i>
                    {showCamera ? "Fechar Câmera" : "Ler código"}
                </button>

                <button
                    className="btn btn-primary flex-grow-1"
                    onClick={onSearch}
                    disabled={loading || !eanCode}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : (
                        <i className="bi bi-search me-2"></i>
                    )}
                    Buscar
                </button>
            </div>

            {showCamera && (
                <div className="col-12 mt-3 animate__animated animate__fadeIn">
                    <div className="position-relative bg-dark rounded overflow-hidden shadow-sm"
                        style={{ height: "300px" }}>

                        <video
                            id="video"
                            ref={videoRef}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                            muted
                            playsInline
                        />

                        {/* Overlay visual */}
                        <div className="position-absolute top-50 start-50 translate-middle border border-2 border-primary"
                            style={{ width: "80%", height: "40%", borderRadius: "8px", pointerEvents: "none", opacity: 0.5 }}>
                        </div>
                        <div className="position-absolute bottom-0 start-50 translate-middle-x bg-dark bg-opacity-75 text-white px-3 py-1 mb-2 rounded-pill small">
                            Aponte para o código de barras
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}