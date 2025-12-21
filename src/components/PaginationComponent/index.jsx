export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange
}) {
    if (!totalPages || totalPages <= 1) return null;

    return (
        <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">

                {/* Anterior */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                </li>

                {/* Números das páginas */}
                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <li
                            key={pageNumber}
                            className={`page-item ${currentPage === pageNumber ? "active" : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}

                {/* Próximo */}
                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                        }`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Próximo
                    </button>
                </li>

            </ul>
        </nav>
    );
}
