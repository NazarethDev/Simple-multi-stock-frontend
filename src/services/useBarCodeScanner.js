import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const codeReader = new BrowserMultiFormatReader();

export function useBarCodeScanner({ videoRef, enabled, onDetected }) {
    const controlsRef = useRef(null);

    useEffect(() => {
        // Só inicia se estiver habilitado e o elemento de vídeo existir
        if (!enabled || !videoRef.current) return;

        let isMounted = true;

        const startScanning = async () => {
            try {
                // Tenta forçar a câmera traseira (environment)
                const constraints = { video: { facingMode: "environment" } };

                const controls = await codeReader.decodeFromVideoDevice(
                    undefined, // undefined usa a câmera padrão, ou você pode listar dispositivos
                    videoRef.current,
                    (result, error) => {
                        if (result && isMounted) {
                            onDetected(result.getText());
                        }
                    },
                    constraints
                );

                controlsRef.current = controls;
            } catch (err) {
                console.error("Falha ao acessar a câmera:", err);
            }
        };

        startScanning();

        return () => {
            isMounted = false;
            if (controlsRef.current) {
                controlsRef.current.stop();
                controlsRef.current = null;
            }
        };
    }, [enabled, videoRef, onDetected]);
}