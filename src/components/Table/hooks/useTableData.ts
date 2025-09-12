import { useMemo } from 'react';
import type { DataItem, UseTableDataProps, UseTableDataReturn, SortConfig } from '../types';
import { sortData, filterData, paginateData } from '../utils';

const useTableData = <T extends DataItem>({
  data,
  columns,
  filters = [],
  sortConfig,
  pagination,
}: UseTableDataProps<T>): UseTableDataReturn<T> => {
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filtering
    const filterValues: Record<keyof T, any> = {} as Record<keyof T, any>;
    filters.forEach((filter) => {
      const value = (filter as any).value;
      if (value !== undefined && value !== null && value !== '') {
        filterValues[filter.key] = value;
      }
    });

    if (Object.keys(filterValues).length > 0) {
      result = filterData(result, filterValues);
    }

    // Apply sorting
    if (sortConfig) {
      result = sortData(result, sortConfig);
    }

    // Apply pagination
    if (pagination) {
      result = paginateData(result, pagination.page, pagination.pageSize);
    }

    return result;
  }, [data, filters, sortConfig, pagination]);

  const totalItems = useMemo(() => {
    let result = [...data];

    // Apply only filtering for total count (not pagination)
    const filterValues: Record<keyof T, any> = {} as Record<keyof T, any>;
    filters.forEach((filter) => {
      const value = (filter as any).value;
      if (value !== undefined && value !== null && value !== '') {
        filterValues[filter.key] = value;
      }
    });

    if (Object.keys(filterValues).length > 0) {
      result = filterData(result, filterValues);
    }

    return result.length;
  }, [data, filters]);

  return {
    processedData,
    totalItems,
    isLoading: false,
    error: null,
    refetch: () => {
      // This would be implemented for async data fetching
      console.log('Refetching data...');
    },
  };
};

export default useTableData;