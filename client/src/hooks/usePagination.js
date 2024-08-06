import { useState, useMemo } from 'react';

const usePagination = (filteredItems, itemsPerPage = 6) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(filteredItems.length / itemsPerPage), [filteredItems.length, itemsPerPage]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, itemsPerPage, filteredItems]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        handlePageChange
    };
};

export default usePagination;
