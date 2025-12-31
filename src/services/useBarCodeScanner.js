import { useEffect, useRef } from "react";
import getEanCode from "./eanCodeScan";

export function useBarCodeScanner({
    videoRef,
    enabled,
    onDetected,
}) {
    const scannerStarted = useRef(false);

    useEffect(() => {
        if (!enabled) return;
        if (!videoRef.current) return;
        if (scannerStarted.current) return;

        scannerStarted.current = true;

        getEanCode(videoRef.current)
            .then(code => onDetected(code))
            .catch(console.error);

        return () => {
            scannerStarted.current = false;

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach(track => track.stop());
            }
        };
    }, [enabled, videoRef, onDetected]);
}