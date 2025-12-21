import { Link } from "react-router-dom";

export default function InitialPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 gap-4">
            <Link to="/expira-breve" className="btn btn-outline-light rounded w-100" >Validades próximas</Link>
            <Link to="/novo-produto" className="btn btn-outline-light rounded w-100">Cadastrar novo produto</Link>
            <Link to="/lista-de-produtos" className="btn btn-outline-light rounded w-100">Lista de produtos</Link>
            <Link to="/estatisticas" className="btn btn-outline-light rounded w-100">Estatísticas</Link>
        </div>
    )
}