import { useState, useEffect } from "react"; // Adicionado useEffect
import { createNewProduct } from "../../services/multiStockApi.js"
import ProductCardComponentEdit from "../../components/ProductCardComponentEdit/index.jsx";
import BarCodeSearch from "../../components/BarCodeSearch/index.jsx";
import { useBarCodeSearchService } from "../../services/useBarCodeSearchService";

export default function NewProductPage() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    eanCode,
    setEanCode,
    loading,
    showCamera,
    handleReadBarcode,
  } = useBarCodeSearchService();

  async function handleSubmit(e) {
    e.preventDefault();

    const parsedCost = cost === "" ? 0 : Number(cost);

    if (cost === "" || Number.isNaN(parsedCost)) {
      setMessage("Custo inválido");
      alert("Custo inválido");
      return;
    }

    if (!eanCode) {
      alert("Por favor, insira ou leia um código de barras");
      return;
    }

    try {
      const response = await createNewProduct({
        name: name,
        eanCode: eanCode,
        expiresAt: date,
        cost: parsedCost,
      });

      if (response.status === 201) {
        setProduct(response.data);
        setShowEditModal(true);
        setMessage("Produto criado com sucesso!");
      }

    } catch (error) {
      if (error.response?.status === 409) {
        setProduct(error.response.data.product);
        setMessage("Produto já cadastrado no sistema.");
        setShowEditModal(true);
      } else {
        setMessage("Erro ao salvar produto");
      }
    }
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setProduct(null);

    setEanCode("");
    setDate("");
    setName("");
    setCost("");
    setMessage("");
  }

  return (
    <div className="container mt-4">
      {message && <div className={`alert ${message.includes("Erro") ? 'alert-danger' : 'alert-info'}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

        <div className="row g-2">
          <BarCodeSearch
            eanCode={eanCode}
            onChange={setEanCode}
            isSearchDisabled={true}
            onSearch={() => { }}
            onReadBarcode={handleReadBarcode}
            loading={loading}
            showCamera={showCamera}
          />
        </div>

        <div className="row g-2">
          <div className="col-6 col-md-4">
            <label className="small text-muted">Data de Validade</label>
            <input
              type="date"
              className="form-control"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-4">
            <label className="small text-muted">Custo (R$)</label>
            <input
              type="text"
              inputMode="decimal"
              className="form-control"
              value={cost}
              placeholder="0.00"
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                if (/^\d*\.?\d*$/.test(value)) {
                  setCost(value);
                }
              }}
            />
          </div>
        </div>

        <div className="row g-2">
          <div className="col-12">
            <label className="small text-muted">Nome do Produto</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Arroz Tio João 5kg"
              required
            />
          </div>
        </div>

        <div className="col-12 d-grid mt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            Salvar produto
          </button>
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