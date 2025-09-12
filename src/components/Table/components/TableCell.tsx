import React, { type ReactNode } from 'react';
import { Box } from '@mui/joy';
import type { DataItem, Column } from '../types';
import { useTableTheme } from '../hooks';
import { getColumnWidth, getColumnAlignment, formatCellValue } from '../utils';

interface TableCellProps<T extends DataItem> {
  column: Column<T>;
  row: T;
  index: number;
  value: T[keyof T];
  children?: ReactNode;
}

const TableCell = <T extends DataItem>({
  column,
  row,
  index,
  value,
  children,
}: TableCellProps<T>) => {
  const { theme } = useTableTheme();

  const renderContent = () => {
    if (children) return children;
    if (column.render) return column.render(value, row, index);
    return formatCellValue(value);
  };

  return (
    <Box
      component="td"
      sx={{
        padding: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.border}`,
        fontSize: theme.typography.body.fontSize,
        fontWeight: theme.typography.body.fontWeight,
        color: theme.colors.text,
        textAlign: getColumnAlignment(column) as any,
        width: getColumnWidth(column),
        minWidth: column.minWidth as any,
        maxWidth: column.maxWidth as any,
        position: column.sticky ? 'sticky' : 'static',
        left: column.sticky ? 0 : 'auto',
        zIndex: column.sticky ? 1 : 0,
        backgroundColor: column.sticky ? 'inherit' : 'transparent',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      } as any}
      title={typeof value === 'string' ? value : undefined}
    >
      {renderContent()}
    </Box>
  );
};

export default TableCell;