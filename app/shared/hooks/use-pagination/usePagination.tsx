import { useMemo, useState } from 'react';

type UsePaginationOptions<T> = {
  data: T[];
  itemsPerPage: number;
};

export function usePagination<T>({ data, itemsPerPage }: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState(1);
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = (currentPage - 1 + visiblePages) * itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, visiblePages, itemsPerPage]);

  const handleLoadMore = () => {
    const maxVisiblePages = totalPages - currentPage + 1;
    setVisiblePages((prev) => Math.min(prev + 1, maxVisiblePages));
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      if (visiblePages > 1) {
        setCurrentPage(currentPage + visiblePages);
        setVisiblePages(1);
      } else {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(page);
      setVisiblePages(1);
    }
  };

  const hasMore = (currentPage - 1 + visiblePages) * itemsPerPage < data.length;

  return {
    currentPage,
    totalPages,
    visiblePages,
    paginatedData,
    handleLoadMore,
    handlePageChange,
    hasMore
  };
}
