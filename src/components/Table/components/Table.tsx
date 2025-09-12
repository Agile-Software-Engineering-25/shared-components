import React, { useState, useMemo } from 'react';
import { Box } from '@mui/joy';
import type { DataItem, TableProps } from '../types';
import { useBreakpoint, useTableTheme, useSort, useFilters, useSelection } from '../hooks';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import { sortData, filterData, paginateData } from '../utils';

const Table = <T extends DataItem>({
  data,
  config,
  className,
  style,
  'data-testid': testId,
}: TableProps<T>) => {
  const { isMobile } = useBreakpoint();
  const { theme } = useTableTheme({ customTheme: config.theme });
  
  // State management hooks
  const {
    sortConfig,
    handleSort,
    getSortDirection,
    isSorted,
  } = useSort<T>();

  const {
    filterValues,
    setFilterValue,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters({
    filters: config.filters || [],
  });

  const {
    selectedIds,
    isSelected,
    isAllSelected,
    isSomeSelected,
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    deselectAll,
    toggleAll,
  } = useSelection({
    data,
    mode: config.selectable?.mode || 'none',
    selectableRowIds: config.selectable?.selectableRowIds,
  });

  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(config.pagination?.page || 1);
  const [currentPageSize, setCurrentPageSize] = useState(config.pagination?.pageSize || 10);

  // Process data through filtering, sorting, and pagination
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filtering
    if (hasActiveFilters) {
      result = filterData(result, filterValues);
    }

    // Apply sorting
    if (sortConfig) {
      result = sortData(result, sortConfig);
    }

    return result;
  }, [data, filterValues, hasActiveFilters, sortConfig]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    if (!config.pagination) return processedData;
    return paginateData(processedData, currentPage, currentPageSize);
  }, [processedData, currentPage, currentPageSize, config.pagination]);

  // Update pagination config
  const paginationConfig = useMemo(() => {
    if (!config.pagination) return undefined;
    return {
      ...config.pagination,
      page: currentPage,
      pageSize: currentPageSize,
      total: processedData.length,
    };
  }, [config.pagination, currentPage, currentPageSize, processedData.length]);

  // Event handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSelectAll = () => {
    if (config.selectable?.mode === 'multiple') {
      toggleAll();
      if (config.selectable.onSelectionChange) {
        config.selectable.onSelectionChange(isAllSelected ? new Set() : selectedIds);
      }
    }
  };

  const handleSelectItem = (id: T['id']) => {
    toggleItem(id);
    if (config.selectable?.onSelectionChange) {
      const newSelection = new Set(selectedIds);
      if (selectedIds.has(id)) {
        newSelection.delete(id);
      } else {
        if (config.selectable.mode === 'single') {
          newSelection.clear();
        }
        newSelection.add(id);
      }
      config.selectable.onSelectionChange(newSelection);
    }
  };

  // Loading state
  if (config.loading) {
    return (
      <Box className={className} style={style} data-testid={testId}>
        <LoadingState
          rows={currentPageSize}
          columns={config.columns.length}
          message="Loading table data..."
        />
      </Box>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <Box className={className} style={style} data-testid={testId}>
        <EmptyState
          message={config.empty?.message || 'No data available'}
          icon={config.empty?.icon}
          action={config.empty?.action}
        />
      </Box>
    );
  }

  // No results after filtering
  if (processedData.length === 0 && hasActiveFilters) {
    return (
      <Box className={className} style={style} data-testid={testId}>
        <FilterBar
          filters={config.filters || []}
          filterValues={filterValues}
          onFilterChange={setFilterValue}
          onClearFilter={clearFilter}
          onClearAllFilters={clearAllFilters}
          activeFilterCount={activeFilterCount}
          collapsed={filtersCollapsed}
          onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
        />
        <EmptyState
          message="No results found for current filters"
          action={{
            label: 'Clear filters',
            onClick: clearAllFilters,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      className={className}
      style={style}
      data-testid={testId}
      sx={{
        width: '100%',
        backgroundColor: theme.colors.surface,
        borderRadius: 'var(--joy-radius-sm)',
        overflow: 'hidden',
        boxShadow: theme.shadows.sm,
      }}
    >
      {/* Filter bar */}
      {config.filterable && config.filters && config.filters.length > 0 && (
        <FilterBar
          filters={config.filters}
          filterValues={filterValues}
          onFilterChange={setFilterValue}
          onClearFilter={clearFilter}
          onClearAllFilters={clearAllFilters}
          activeFilterCount={activeFilterCount}
          collapsed={filtersCollapsed}
          onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
        />
      )}

      {/* Table content */}
      {isMobile && config.mobileConfig ? (
        <MobileTable
          data={paginatedData}
          mobileConfig={config.mobileConfig}
          actions={config.actions}
          selectable={config.selectable?.mode !== 'none'}
          selectedIds={selectedIds}
          onSelectItem={handleSelectItem}
          onRowClick={config.onRowClick}
          onRowDoubleClick={config.onRowDoubleClick}
        />
      ) : (
        <DesktopTable
          data={paginatedData}
          columns={config.columns}
          actions={config.actions}
          sortable={config.sortable}
          selectable={config.selectable?.mode !== 'none'}
          selectedIds={selectedIds}
          onSort={handleSort}
          getSortDirection={getSortDirection}
          onSelectAll={handleSelectAll}
          onSelectItem={handleSelectItem}
          isAllSelected={isAllSelected}
          isSomeSelected={isSomeSelected}
          onRowClick={config.onRowClick}
          onRowDoubleClick={config.onRowDoubleClick}
          rowClassName={config.rowClassName}
          stickyHeader={config.stickyHeader}
          fullScreen={config.fullScreen}
        />
      )}

      {/* Pagination */}
      {paginationConfig && (
        <Pagination
          pagination={paginationConfig}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </Box>
  );
};

export default Table;