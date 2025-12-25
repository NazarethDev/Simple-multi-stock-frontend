import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function HeaderComponent() {

    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname]);

    return (

        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Multi Stock</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(prev => !prev)}>

                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
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
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/lista-de-validades"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Lista de validades
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