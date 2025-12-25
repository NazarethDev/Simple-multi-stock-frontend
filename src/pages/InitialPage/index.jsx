import { Link } from "react-router-dom";

export default function InitialPage() {
    return (
        <div className="container mt-4">
            <div className="row g-3">

                <div className="col-12 col-md-6">
                    <Link
                        to="/lista-de-validades"
                        className="btn btn-outline-light w-100 py-3"
                    >
                        Lista de validades
                    </Link>
                </div>

                <div className="col-12 col-md-6">
                    <Link
                        to="/novo-produto"
                        className="btn btn-outline-light w-100 py-3"
                    >
                        Cadastrar novo produto
                    </Link>
                </div>

                <div className="col-12 col-md-6">
                    <Link
                        to="/procurar-por-codigo"
                        className="btn btn-outline-light w-100 py-3"
                    >
                        Encontrar por código de barras
                    </Link>
                </div>

                <div className="col-12 col-md-6">
                    <Link
                        to="/estatisticas"
                        className="btn btn-outline-light w-100 py-3"
                    >
                        Estatísticas
                    </Link>
                </div>

            </div>
        </div>
    );
}
