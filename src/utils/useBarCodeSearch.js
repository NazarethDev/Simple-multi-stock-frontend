import { useState } from "react";
import getEanCode from "../services/eanCodeScan.js";
import { findByBarCode } from "../services/multiStockApi.js";

export function useBarcodeSearch() {
    const [eanCode, setEanCode] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    async function handleReadBarcode() {
        try {
            setShowCamera(true);

            setTimeout(async () => {
                const ean = await getEanCode("video");
                setEanCode(ean);
                setShowCamera(false);
                await handleSearch(ean);
            }, 300);

        } catch (error) {
            console.error("Erro ao ler código de barras:", error);
            alert("Não foi possível ler o código de barras");
            setShowCamera(false);
        }
    }

    async function handleSearch(code = eanCode) {
        if (!code) return;

        try {
            setLoading(true);
            const response = await findByBarCode(code);
            setProducts(response.data);
        } catch (error) {
            setProducts([]);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        eanCode,
        setEanCode,
        products,
        loading,
        showCamera,
        handleReadBarcode,
        handleSearch,
    };
}
