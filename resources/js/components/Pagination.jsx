const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                disabled={currentPage === 1}
                onClick={(e) => {
                    e.preventDefault();
                    onPageChange(currentPage - 1)
                }}
                className="px-3 py-1 rounded bg-white border disabled:opacity-50"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded border
                        ${page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-white hover:bg-gray-100"}
                    `}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={(e) => { 
                    e.preventDefault();
                    onPageChange(currentPage + 1)
                }}
                className="px-3 py-1 rounded bg-white border disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
