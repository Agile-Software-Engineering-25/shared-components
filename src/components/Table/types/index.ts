import type { ReactNode } from 'react';

export interface DataItem {
  id: string | number;
  [key: string]: any;
}

export interface Column<T extends DataItem> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  headerRender?: () => ReactNode;
  hideOnMobile?: boolean;
  sticky?: boolean;
}

export interface Action<T extends DataItem> {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: T, index: number) => void;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  variant?: 'solid' | 'outlined' | 'soft' | 'plain';
}

export interface Filter<T extends DataItem> {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  options?: Array<{ label: string; value: any }>;
  placeholder?: string;
  defaultValue?: any;
}

export interface SortConfig<T extends DataItem> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showFirstLast?: boolean;
}

export interface SelectionConfig<T extends DataItem> {
  mode: 'single' | 'multiple' | 'none';
  selectedIds: Set<T['id']>;
  onSelectionChange: (selectedIds: Set<T['id']>) => void;
  selectableRowIds?: Set<T['id']>;
  showSelectAll?: boolean;
}

export interface MobileTableConfig<T extends DataItem> {
  primaryField: keyof T;
  secondaryField?: keyof T;
  tertiaryField?: keyof T;
  showActions?: boolean;
  customRenderer?: (row: T, index: number) => ReactNode;
}

export interface TableTheme {
  colors: {
    surface: string;
    surfaceHover: string;
    surfaceSelected: string;
    border: string;
    text: string;
    textSecondary: string;
    primary: string;
    success: string;
    danger: string;
    warning: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    header: {
      fontSize: string;
      fontWeight: string;
    };
    body: {
      fontSize: string;
      fontWeight: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface TableConfig<T extends DataItem> {
  columns: Column<T>[];
  actions?: Action<T>[];
  selectable?: SelectionConfig<T>;
  sortable?: boolean;
  filterable?: boolean;
  filters?: Filter<T>[];
  pagination?: PaginationConfig;
  mobileConfig?: MobileTableConfig<T>;
  loading?: boolean;
  empty?: {
    message: string;
    icon?: ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  expandable?: {
    render: (row: T) => ReactNode;
    expandedIds?: Set<T['id']>;
    onExpandChange?: (expandedIds: Set<T['id']>) => void;
  };
  stickyHeader?: boolean;
  fullScreen?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;
  theme?: Partial<TableTheme>;
}

export interface TableProps<T extends DataItem> {
  data: T[];
  config: TableConfig<T>;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export interface UseTableDataProps<T extends DataItem> {
  data: T[];
  columns: Column<T>[];
  filters?: Filter<T>[];
  sortConfig?: SortConfig<T>;
  pagination?: PaginationConfig;
}

export interface UseTableDataReturn<T extends DataItem> {
  processedData: T[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UsePaginationProps {
  total: number;
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  getPageItems: <T>(items: T[]) => T[];
}

export interface UseSelectionProps<T extends DataItem> {
  data: T[];
  mode: 'single' | 'multiple' | 'none';
  initialSelection?: Set<T['id']>;
  selectableRowIds?: Set<T['id']>;
}

export interface UseSelectionReturn<T extends DataItem> {
  selectedIds: Set<T['id']>;
  isSelected: (id: T['id']) => boolean;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  selectItem: (id: T['id']) => void;
  deselectItem: (id: T['id']) => void;
  toggleItem: (id: T['id']) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleAll: () => void;
}

export type TableBuilderColumn<T extends DataItem> = Omit<Column<T>, 'key'> & {
  key?: keyof T;
};

export interface TableBuilder<T extends DataItem> {
  addColumn: (key: keyof T, label: string, options?: Omit<Column<T>, 'key' | 'label'>) => TableBuilder<T>;
  addColumns: (columns: Array<{ key: keyof T; label: string } & Omit<Column<T>, 'key' | 'label'>>) => TableBuilder<T>;
  addAction: (action: Action<T>) => TableBuilder<T>;
  addActions: (actions: Action<T>[]) => TableBuilder<T>;
  enableSelection: (mode: 'single' | 'multiple', options?: Partial<SelectionConfig<T>>) => TableBuilder<T>;
  enableSorting: () => TableBuilder<T>;
  enableFiltering: () => TableBuilder<T>;
  addFilter: (filter: Filter<T>) => TableBuilder<T>;
  addFilters: (filters: Filter<T>[]) => TableBuilder<T>;
  enablePagination: (options?: Partial<PaginationConfig>) => TableBuilder<T>;
  configureMobile: (config: MobileTableConfig<T>) => TableBuilder<T>;
  enableExpandable: (render: (row: T) => ReactNode) => TableBuilder<T>;
  setTheme: (theme: Partial<TableTheme>) => TableBuilder<T>;
  onRowClick: (handler: (row: T, index: number) => void) => TableBuilder<T>;
  onRowDoubleClick: (handler: (row: T, index: number) => void) => TableBuilder<T>;
  build: () => TableConfig<T>;
}