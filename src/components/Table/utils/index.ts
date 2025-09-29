import type { DataItem, Column, Filter, SortConfig } from '../types';

const isDate = (value: any): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

export const sortData = <T extends DataItem>(
  data: T[],
  sortConfig: SortConfig<T> | null
): T[] => {
  if (!sortConfig || !sortConfig.key) {
    return [...data];
  }

  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];

    let comparison = 0;

    if (aValue === null || aValue === undefined) {
      comparison = bValue === null || bValue === undefined ? 0 : 1;
    } else if (bValue === null || bValue === undefined) {
      comparison = -1;
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (isDate(aValue) && isDate(bValue)) {
      comparison = aValue.getTime() - bValue.getTime();
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortConfig.direction === 'desc' ? -comparison : comparison;
  });
};

export const filterData = <T extends DataItem>(
  data: T[],
  filters: Record<keyof T, any>
): T[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  }

  return data.filter((item) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      if (filterValue === null || filterValue === undefined || filterValue === '') {
        return true;
      }

      const itemValue = item[key as keyof T];

      if (itemValue === null || itemValue === undefined) {
        return false;
      }

      if (typeof filterValue === 'string') {
        return String(itemValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }

      if (typeof filterValue === 'boolean') {
        return Boolean(itemValue) === filterValue;
      }

      if (typeof filterValue === 'number') {
        return Number(itemValue) === filterValue;
      }

      if (isDate(filterValue) && isDate(itemValue)) {
        return itemValue.toDateString() === filterValue.toDateString();
      }

      return itemValue === filterValue;
    });
  });
};

export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number
): T[] => {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};

export const generateUniqueId = (): string => {
  return `table-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getColumnWidth = (column: Column<any>): string => {
  if (column.width) {
    return typeof column.width === 'number' ? `${column.width}px` : column.width;
  }
  return 'auto';
};

export const getColumnAlignment = (column: Column<any>): string => {
  return column.align || 'left';
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const formatCellValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (isDate(value)) {
    return value.toLocaleDateString();
  }

  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  return String(value);
};

export const isValidFilterValue = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

export const createFilterValidator = <T extends DataItem>(
  filters: Filter<T>[]
): ((values: Record<keyof T, any>) => Record<keyof T, string>) => {
  return (values) => {
    const errors: Record<keyof T, string> = {} as Record<keyof T, string>;

    filters.forEach((filter) => {
      const value = values[filter.key];
      
      if (filter.type === 'number' && value && isNaN(Number(value))) {
        errors[filter.key] = 'Must be a valid number';
      }
      
      if (filter.type === 'date' && value && isNaN(Date.parse(value))) {
        errors[filter.key] = 'Must be a valid date';
      }
    });

    return errors;
  };
};

export const getDefaultTableTheme = () => ({
  colors: {
    surface: 'var(--joy-palette-background-surface, #ffffff)',
    surfaceHover: 'var(--joy-palette-background-level1, #f7f7f8)',
    surfaceSelected: 'var(--joy-palette-primary-50, #e3f2fd)',
    border: 'var(--joy-palette-divider, #e0e0e0)',
    text: 'var(--joy-palette-text-primary, #000000)',
    textSecondary: 'var(--joy-palette-text-secondary, #666666)',
    primary: 'var(--joy-palette-primary-500, #1976d2)',
    success: 'var(--joy-palette-success-500, #2e7d32)',
    danger: 'var(--joy-palette-danger-500, #d32f2f)',
    warning: 'var(--joy-palette-warning-500, #ed6c02)',
  },
  spacing: {
    xs: 'var(--joy-spacing-1, 4px)',
    sm: 'var(--joy-spacing-2, 8px)',
    md: 'var(--joy-spacing-3, 12px)',
    lg: 'var(--joy-spacing-4, 16px)',
    xl: 'var(--joy-spacing-6, 24px)',
  },
  typography: {
    header: {
      fontSize: 'var(--joy-fontSize-sm, 14px)',
      fontWeight: 'var(--joy-fontWeight-md, 500)',
    },
    body: {
      fontSize: 'var(--joy-fontSize-sm, 14px)',
      fontWeight: 'var(--joy-fontWeight-md, 400)',
    },
  },
  shadows: {
    sm: 'var(--joy-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
    md: 'var(--joy-shadow-md, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06))',
    lg: 'var(--joy-shadow-lg, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
});

export const mergeThemes = (defaultTheme: any, customTheme: any): any => {
  const merged = { ...defaultTheme };
  
  Object.keys(customTheme).forEach((key) => {
    if (typeof customTheme[key] === 'object' && !Array.isArray(customTheme[key])) {
      merged[key] = { ...defaultTheme[key], ...customTheme[key] };
    } else {
      merged[key] = customTheme[key];
    }
  });
  
  return merged;
};

export const createTableBuilder = <T extends DataItem>() => {
  const config: any = {
    columns: [],
    actions: [],
    sortable: false,
    filterable: false,
    filters: [],
  };

  const builder = {
    addColumn: (key: keyof T, label: string, options = {}) => {
      config.columns.push({ key, label, ...options });
      return builder;
    },
    
    addColumns: (columns: Array<{ key: keyof T; label: string } & any>) => {
      config.columns.push(...columns);
      return builder;
    },
    
    addAction: (action: any) => {
      config.actions.push(action);
      return builder;
    },
    
    addActions: (actions: any[]) => {
      config.actions.push(...actions);
      return builder;
    },
    
    enableSelection: (mode: 'single' | 'multiple', options = {}) => {
      config.selectable = {
        mode,
        selectedIds: new Set(),
        onSelectionChange: () => {},
        ...options,
      };
      return builder;
    },
    
    enableSorting: () => {
      config.sortable = true;
      return builder;
    },
    
    enableFiltering: () => {
      config.filterable = true;
      return builder;
    },
    
    addFilter: (filter: any) => {
      config.filters.push(filter);
      config.filterable = true;
      return builder;
    },
    
    addFilters: (filters: any[]) => {
      config.filters.push(...filters);
      config.filterable = true;
      return builder;
    },
    
    enablePagination: (options = {}) => {
      config.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: [5, 10, 25, 50],
        showPageSizeSelector: true,
        showFirstLast: true,
        ...options,
      };
      return builder;
    },
    
    configureMobile: (mobileConfig: any) => {
      config.mobileConfig = mobileConfig;
      return builder;
    },
    
    enableExpandable: (render: any) => {
      config.expandable = {
        render,
        expandedIds: new Set(),
        onExpandChange: () => {},
      };
      return builder;
    },
    
    setTheme: (theme: any) => {
      config.theme = theme;
      return builder;
    },
    
    onRowClick: (handler: any) => {
      config.onRowClick = handler;
      return builder;
    },
    
    onRowDoubleClick: (handler: any) => {
      config.onRowDoubleClick = handler;
      return builder;
    },
    
    build: () => config,
  };

  return builder;
};