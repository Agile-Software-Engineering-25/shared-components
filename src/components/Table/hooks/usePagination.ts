import { useState, useMemo, useCallback } from "react";
import type { UsePaginationProps, UsePaginationReturn } from "../types";

const usePagination = ({
  total,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const hasNext = useMemo(() => {
    return page < totalPages;
  }, [page, totalPages]);

  const hasPrevious = useMemo(() => {
    return page > 1;
  }, [page]);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext]);

  const previousPage = useCallback(() => {
    if (hasPrevious) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const setPageSize = useCallback(
    (newPageSize: number) => {
      setPageSizeState(newPageSize);
      // Adjust current page if necessary
      const newTotalPages = Math.ceil(total / newPageSize);
      if (page > newTotalPages) {
        setPage(Math.max(1, newTotalPages));
      }
    },
    [total, page]
  );

  const getPageItems = useCallback(
    <T>(items: T[]): T[] => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return items.slice(startIndex, endIndex);
    },
    [page, pageSize]
  );

  return {
    page,
    pageSize,
    totalPages,
    hasNext,
    hasPrevious,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    getPageItems,
  };
};

export default usePagination;
