import { useState } from "react";
import { findByBarCode } from "../services/multiStockApi.js"

export function useBarCodeSearchService() {
    const [eanCode, setEanCode] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    function handleReadBarcode() {
        setShowCamera(prev => !prev);
    }

    async function handleSearch() {
        setLoading(true);
        try {
            const response = await findByBarCode(eanCode);
            setProducts(response.data)
        } catch (error) {
            console.log("Erro ao buscar produto: ", error);
            setProducts([]);
            throw error
        } finally {
            setLoading(false);
            setShowCamera(false);
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
