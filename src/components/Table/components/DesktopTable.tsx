import React from "react";
import { Box, Table as JoyTable } from "@mui/joy";
import type { DataItem, Column, Action } from "../types";
import { useTableTheme } from "../hooks";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import RowActions from "./RowActions";

interface DesktopTableProps<T extends DataItem> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  sortable?: boolean;
  selectable?: boolean;
  selectedIds?: Set<T["id"]>;
  onSort?: (key: keyof T) => void;
  getSortDirection?: (key: keyof T) => "asc" | "desc" | null;
  onSelectAll?: () => void;
  onSelectItem?: (id: T["id"]) => void;
  isAllSelected?: boolean;
  isSomeSelected?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;
  stickyHeader?: boolean;
  fullScreen?: boolean;
}

const DesktopTable = <T extends DataItem>({
  data,
  columns,
  actions = [],
  sortable = false,
  selectable = false,
  selectedIds = new Set(),
  onSort,
  getSortDirection,
  onSelectAll,
  onSelectItem,
  isAllSelected = false,
  isSomeSelected = false,
  onRowClick,
  onRowDoubleClick,
  rowClassName,
  stickyHeader = false,
  fullScreen = false,
}: DesktopTableProps<T>) => {
  const { theme } = useTableTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: fullScreen ? "100vh" : "auto",
        overflow: "auto",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "var(--joy-radius-sm)",
        boxShadow: theme.shadows.sm,
      }}
    >
      <JoyTable
        stickyHeader={stickyHeader}
        sx={{
          width: "100%",
          minWidth: "100%",
          tableLayout: "fixed",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <TableHeader
          columns={columns}
          sortable={sortable}
          selectable={selectable}
          onSort={onSort}
          getSortDirection={getSortDirection}
          onSelectAll={onSelectAll}
          isAllSelected={isAllSelected}
          isSomeSelected={isSomeSelected}
          sticky={stickyHeader}
        />

        <Box component="tbody">
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              index={index}
              selectable={selectable}
              selected={selectedIds.has(row.id)}
              onSelect={() => onSelectItem?.(row.id)}
              onClick={onRowClick}
              onDoubleClick={onRowDoubleClick}
              className={rowClassName?.(row, index)}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  column={column}
                  row={row}
                  index={index}
                  value={row[column.key]}
                />
              ))}

              {actions.length > 0 && (
                <Box
                  component="td"
                  sx={{
                    padding: theme.spacing.md,
                    width: "120px",
                    minWidth: "120px",
                  }}
                  data-table-action
                >
                  <RowActions row={row} index={index} actions={actions} />
                </Box>
              )}
            </TableRow>
          ))}
        </Box>
      </JoyTable>
    </Box>
  );
};

export default DesktopTable;
