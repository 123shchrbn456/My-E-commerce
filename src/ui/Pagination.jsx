import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ dataCount }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("_page") ? 1 : Number(searchParams.get("_page"));

    const pageMaxCount = Math.ceil(dataCount / PAGE_SIZE);

    function nextPage() {
        const next = currentPage !== pageMaxCount ? currentPage + 1 : currentPage;

        searchParams.set("_page", next);
        searchParams.set("_limit", PAGE_SIZE);
        setSearchParams(searchParams);
    }

    function prevPage() {
        const prev = currentPage !== 1 ? currentPage - 1 : currentPage;

        searchParams.set("_page", prev);
        searchParams.set("_limit", PAGE_SIZE);
        setSearchParams(searchParams);
    }

    return (
        <>
            <button onClick={prevPage} disabled={currentPage === 1}>
                <span>Previous</span>
            </button>

            {currentPage > 1 && (
                <button onClick={prevPage}>
                    <span>{currentPage - 1}</span>
                </button>
            )}

            <button onClick={prevPage} disabled>
                <span>{currentPage}</span>
            </button>

            {currentPage !== pageMaxCount && (
                <button onClick={prevPage}>
                    <span>{currentPage + 1}</span>
                </button>
            )}

            <button onClick={nextPage} disabled={currentPage === pageMaxCount}>
                <span>Next</span>
            </button>
        </>
    );
}

export default Pagination;
