import { useState, useCallback } from 'react';
import type { DataItem, SortConfig } from '../types';

const useSort = <T extends DataItem>(initialSort?: SortConfig<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    initialSort || null
  );

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return null; // Remove sorting
        }
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  const getSortDirection = useCallback((key: keyof T): 'asc' | 'desc' | null => {
    return sortConfig?.key === key ? sortConfig.direction : null;
  }, [sortConfig]);

  const isSorted = useCallback((key: keyof T): boolean => {
    return sortConfig?.key === key;
  }, [sortConfig]);

  return {
    sortConfig,
    handleSort,
    clearSort,
    getSortDirection,
    isSorted,
    setSortConfig,
  };
};

export default useSort;