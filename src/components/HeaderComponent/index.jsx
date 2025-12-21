import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Collapse } from "bootstrap"


export default function HeaderComponent() {

    const location = useLocation();

    useEffect(() => {
        const navbar = document.getElementById("navbarNav");

        if (navbar && navbar.classList.contains("show")) {
            const bsCollapse = new Collapse(navbar, {
                toggle: false,
            });
            bsCollapse.hide();
        }
    }, [location.pathname]);

    return (

        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Multi Stock</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" end className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            } >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/novo-produto"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Novo produto
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/lista-de-produtos"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Lista de produtos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/expira-breve"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Expiram em breve
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/estatisticas"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Estatísticas
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )

}