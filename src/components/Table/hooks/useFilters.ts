import { useState, useCallback, useMemo } from 'react';
import type { DataItem, Filter } from '../types';

interface UseFiltersProps<T extends DataItem> {
  filters: Filter<T>[];
  initialValues?: Record<keyof T, any>;
}

interface UseFiltersReturn<T extends DataItem> {
  filterValues: Record<keyof T, any>;
  setFilterValue: (key: keyof T, value: any) => void;
  clearFilter: (key: keyof T) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  getFilterValue: (key: keyof T) => any;
  resetFilters: () => void;
}

const useFilters = <T extends DataItem>({
  filters,
  initialValues = {} as Record<keyof T, any>,
}: UseFiltersProps<T>): UseFiltersReturn<T> => {
  const [filterValues, setFilterValues] = useState<Record<keyof T, any>>(initialValues);

  const setFilterValue = useCallback((key: keyof T, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: keyof T) => {
    setFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterValues({} as Record<keyof T, any>);
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues(initialValues);
  }, [initialValues]);

  const getFilterValue = useCallback((key: keyof T) => {
    return filterValues[key];
  }, [filterValues]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filterValues).some(value => 
      value !== undefined && value !== null && value !== ''
    );
  }, [filterValues]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filterValues).filter(value => 
      value !== undefined && value !== null && value !== ''
    ).length;
  }, [filterValues]);

  return {
    filterValues,
    setFilterValue,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
    getFilterValue,
    resetFilters,
  };
};

export default useFilters;