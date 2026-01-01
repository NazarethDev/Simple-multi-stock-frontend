import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const codeReader = new BrowserMultiFormatReader();

export function useBarCodeScanner({ videoRef, enabled, onDetected }) {
    const controlsRef = useRef(null);
    // Usamos uma Ref para o callback para evitar reiniciar o scanner quando ele muda
    const onDetectedRef = useRef(onDetected);
    onDetectedRef.current = onDetected;

    useEffect(() => {
        let isMounted = true;

        const startScanning = async () => {
            await new Promise(resolve => setTimeout(resolve, 200));

            if (!enabled || !isMounted || !videoRef.current) return;

            try {
                const constraints = {
                    video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
                };

                const controls = await codeReader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    (result, error) => {
                        // Verificamos se há um resultado e se ele tem o método getText
                        if (result && isMounted && typeof result.getText === 'function') {
                            const text = result.getText();
                            if (text && text !== "[object Object]") {
                                onDetectedRef.current(text);
                            }
                        }
                    },
                    constraints
                );

                if (!isMounted) {
                    controls.stop();
                } else {
                    controlsRef.current = controls;
                }
            } catch (err) {
                if (err.name !== "AbortError") console.warn("Erro no Scanner:", err);
            }
        };

        if (enabled) {
            startScanning();
        }

        return () => {
            isMounted = false;
            if (controlsRef.current) {
                controlsRef.current.stop();
                controlsRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [enabled, videoRef]); // onDetected removido das dependências
}