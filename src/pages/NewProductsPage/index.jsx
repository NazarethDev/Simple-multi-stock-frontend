import { useState } from "react";
import getEanCode from "../../services/eanCodeScan.js";
import { createNewProduct } from "../../services/multiStockApi.js"
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit/index.jsx";

export default function NewProductPage() {
  const [barCode, setBarCode] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  async function handleReadBarcode() {
    try {
      const ean = await getEanCode("video");
      setBarCode(ean);
    } catch (error) {
      console.error("Erro ao ler código de barras:", error);
      alert("Não foi possível ler o código de barras");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const parsedCost = Number(cost);

    if (cost === "" || Number.isNaN(parsedCost)) {
      setMessage("Custo inválido");
      return
    }

    try {
      const response = await createNewProduct({
        name: name,
        eanCode: barCode,
        expiresAt: date,
        cost: parsedCost,
      });

      if (response.status === 201) {
        setProduct(response.data);
        setShowEditModal(true)
        setMessage("Product created successfully!");

      }

    } catch (error) {
      if (error.response?.status === 409) {
        setProduct(error.response.data.product);
        setMessage("Product already registered in the system.");
      }

      setMessage("Erro ao salvar produto")

    }

  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setProduct(null);

    setBarCode("");
    setDate("");
    setName("");
    setCost("");
    setMessage("");
  }

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3"
      >
        <div className="row g-2">
          <div className="col-12 col-md-8">
            <input
              type="text"
              className="form-control"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              placeholder="Digite ou leia o código"
            />
          </div>

          <div className="col-12 col-md-4 d-grid">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReadBarcode}
            >
              Ler código de barras
            </button>
          </div>
        </div>

        <video
          id="video"
          className="w-100 rounded border"
        />

        <div className="row g-2">
          <div className="col-6 col-md-8">
            <input
              type="date"
              className="form-control"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-8">
            <input
              type="text"
              inputMode="decimal"
              className="form-control"
              value={cost}
              min={0}
              placeholder="Digite o custo do produto"
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                if (/^\d*\.?\d*$/.test(value)) {
                  setCost(value);
                }
              }}
            />
          </div>

          <div className="row g-2">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome e peso do produto"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-4 d-grid">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Salvar produto
            </button>
          </div>
        </div>
      </form>
      {showEditModal && product && (
        <ProductCardComponentEdit
          product={product}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}