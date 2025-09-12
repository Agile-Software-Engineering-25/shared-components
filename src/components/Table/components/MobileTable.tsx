import React from 'react';
import { Box, Card, CardContent, Typography, Checkbox } from '@mui/joy';
import type { DataItem, MobileTableConfig, Action } from '../types';
import { useTableTheme } from '../hooks';
import { formatCellValue } from '../utils';
import RowActions from './RowActions';

interface MobileTableProps<T extends DataItem> {
  data: T[];
  mobileConfig: MobileTableConfig<T>;
  actions?: Action<T>[];
  selectable?: boolean;
  selectedIds?: Set<T['id']>;
  onSelectItem?: (id: T['id']) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
}

const MobileTable = <T extends DataItem>({
  data,
  mobileConfig,
  actions = [],
  selectable = false,
  selectedIds = new Set(),
  onSelectItem,
  onRowClick,
  onRowDoubleClick,
}: MobileTableProps<T>) => {
  const { theme } = useTableTheme();

  const handleCardClick = (row: T, index: number, e: React.MouseEvent) => {
    // Don't trigger card click when clicking on checkbox or actions
    const target = e.target as HTMLElement;
    if (target.closest('[role="checkbox"]') || target.closest('[data-table-action]')) {
      return;
    }
    
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  const renderCustomContent = (row: T, index: number) => {
    if (mobileConfig.customRenderer) {
      return mobileConfig.customRenderer(row, index);
    }

    const primaryValue = row[mobileConfig.primaryField];
    const secondaryValue = mobileConfig.secondaryField 
      ? row[mobileConfig.secondaryField] 
      : null;
    const tertiaryValue = mobileConfig.tertiaryField 
      ? row[mobileConfig.tertiaryField] 
      : null;

    return (
      <Box sx={{ flex: 1 }}>
        <Typography
          level="body-md"
          sx={{
            fontWeight: 'var(--joy-fontWeight-md)',
            color: theme.colors.text,
            marginBottom: secondaryValue || tertiaryValue ? theme.spacing.xs : 0,
          }}
        >
          {formatCellValue(primaryValue)}
        </Typography>
        
        {secondaryValue && (
          <Typography
            level="body-sm"
            sx={{
              color: theme.colors.textSecondary,
              marginBottom: tertiaryValue ? theme.spacing.xs : 0,
            }}
          >
            {formatCellValue(secondaryValue)}
          </Typography>
        )}
        
        {tertiaryValue && (
          <Typography
            level="body-sm"
            sx={{
              color: theme.colors.textSecondary,
            }}
          >
            {formatCellValue(tertiaryValue)}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.sm,
        width: '100%',
      }}
    >
      {data.map((row, index) => (
        <Card
          key={row.id}
          variant="outlined"
          sx={{
            cursor: onRowClick ? 'pointer' : 'default',
            backgroundColor: selectedIds.has(row.id)
              ? theme.colors.surfaceSelected
              : theme.colors.surface,
            '&:hover': {
              backgroundColor: selectedIds.has(row.id)
                ? theme.colors.surfaceSelected
                : theme.colors.surfaceHover,
            },
          }}
          onClick={(e) => handleCardClick(row, index, e)}
          onDoubleClick={() => onRowDoubleClick?.(row, index)}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              padding: theme.spacing.md,
            }}
          >
            {selectable && (
              <Checkbox
                checked={selectedIds.has(row.id)}
                onChange={() => onSelectItem?.(row.id)}
                size="sm"
                aria-label={`Select item ${index + 1}`}
              />
            )}
            
            {renderCustomContent(row, index)}
            
            {actions.length > 0 && mobileConfig.showActions && (
              <Box data-table-action>
                <RowActions
                  row={row}
                  index={index}
                  actions={actions}
                  size="sm"
                />
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MobileTable;