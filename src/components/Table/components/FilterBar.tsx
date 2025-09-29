import React from 'react';
import { Box, Input, Select, Option, Button, IconButton, Chip, Typography } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import type { DataItem, Filter } from '../types';
import { useTableTheme } from '../hooks';

interface FilterBarProps<T extends DataItem> {
  filters: Filter<T>[];
  filterValues: Record<keyof T, any>;
  onFilterChange: (key: keyof T, value: any) => void;
  onClearFilter: (key: keyof T) => void;
  onClearAllFilters: () => void;
  activeFilterCount: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const FilterBar = <T extends DataItem>({
  filters,
  filterValues,
  onFilterChange,
  onClearFilter,
  onClearAllFilters,
  activeFilterCount,
  collapsed = false,
  onToggleCollapse,
}: FilterBarProps<T>) => {
  const { theme } = useTableTheme();

  const renderFilterInput = (filter: Filter<T>) => {
    const value = filterValues[filter.key] ?? '';
    
    switch (filter.type) {
      case 'select':
        return (
          <Select
            size="sm"
            placeholder={filter.placeholder || `Select ${filter.label}`}
            value={value}
            onChange={(_, newValue) => onFilterChange(filter.key, newValue)}
            sx={{ minWidth: '150px' }}
          >
            <Option value="">All</Option>
            {filter.options?.map((option) => (
              <Option key={String(option.value)} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
        
      case 'number':
        return (
          <Input
            size="sm"
            type="number"
            placeholder={filter.placeholder || `Filter by ${filter.label}`}
            value={value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            sx={{ minWidth: '150px' }}
          />
        );
        
      case 'date':
        return (
          <Input
            size="sm"
            type="date"
            placeholder={filter.placeholder || `Filter by ${filter.label}`}
            value={value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            sx={{ minWidth: '150px' }}
          />
        );
        
      case 'boolean':
        return (
          <Select
            size="sm"
            placeholder={filter.placeholder || `Select ${filter.label}`}
            value={value}
            onChange={(_, newValue) => onFilterChange(filter.key, newValue)}
            sx={{ minWidth: '150px' }}
          >
            <Option value="">All</Option>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        );
        
      default:
        return (
          <Input
            size="sm"
            placeholder={filter.placeholder || `Filter by ${filter.label}`}
            value={value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            startDecorator={<SearchIcon />}
            sx={{ minWidth: '200px' }}
          />
        );
    }
  };

  const activeFilters = filters.filter(filter => {
    const value = filterValues[filter.key];
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <Box>
      {/* Filter toggle bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing.md,
          borderBottom: collapsed ? `1px solid ${theme.colors.border}` : 'none',
          backgroundColor: theme.colors.surface,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Show filters' : 'Hide filters'}
          >
            <FilterListIcon />
          </IconButton>
          
          <Typography level="body-sm" sx={{ color: theme.colors.text }}>
            Filters
          </Typography>
          
          {activeFilterCount > 0 && (
            <Chip
              size="sm"
              variant="soft"
              color="primary"
            >
              {activeFilterCount}
            </Chip>
          )}
        </Box>

        {activeFilterCount > 0 && (
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<ClearIcon />}
            onClick={onClearAllFilters}
          >
            Clear all
          </Button>
        )}
      </Box>

      {/* Filter inputs */}
      {!collapsed && (
        <Box
          sx={{
            padding: theme.spacing.md,
            borderBottom: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing.md,
              alignItems: 'end',
            }}
          >
            {filters.map((filter) => (
              <Box
                key={String(filter.key)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.xs,
                  position: 'relative',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ 
                    color: theme.colors.textSecondary,
                    fontWeight: 'var(--joy-fontWeight-md)',
                  }}
                >
                  {filter.label}
                </Typography>
                
                <Box sx={{ position: 'relative' }}>
                  {renderFilterInput(filter)}
                  
                  {filterValues[filter.key] && (
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      onClick={() => onClearFilter(filter.key)}
                      sx={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                      aria-label={`Clear ${filter.label} filter`}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Active filters chips */}
          {activeFilters.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.xs,
                marginTop: theme.spacing.md,
              }}
            >
              {activeFilters.map((filter) => {
                const value = filterValues[filter.key];
                const displayValue = filter.type === 'select' && filter.options
                  ? filter.options.find(option => option.value === value)?.label || value
                  : value;

                return (
                  <Chip
                    key={String(filter.key)}
                    size="sm"
                    variant="soft"
                    color="primary"
                    endDecorator={
                      <IconButton
                        size="sm"
                        onClick={() => onClearFilter(filter.key)}
                        sx={{ '--IconButton-size': '16px' }}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                  >
                    {filter.label}: {String(displayValue)}
                  </Chip>
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FilterBar;