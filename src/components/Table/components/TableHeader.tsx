import { Box, Checkbox } from "@mui/joy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import type { DataItem, Column } from "../types";
import { useTableTheme } from "../hooks";
import { getColumnWidth, getColumnAlignment } from "../utils";

interface TableHeaderProps<T extends DataItem> {
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: boolean;
  onSort?: (key: keyof T) => void;
  getSortDirection?: (key: keyof T) => "asc" | "desc" | null;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  isSomeSelected?: boolean;
  sticky?: boolean;
}

const TableHeader = <T extends DataItem>({
  columns,
  sortable = false,
  selectable = false,
  onSort,
  getSortDirection,
  onSelectAll,
  isAllSelected = false,
  isSomeSelected = false,
  sticky = false,
}: TableHeaderProps<T>) => {
  const { theme } = useTableTheme();

  const getSortIcon = (column: Column<T>) => {
    if (!sortable || !column.sortable || !getSortDirection) return null;

    const direction = getSortDirection(column.key);
    if (direction === "asc") return <KeyboardArrowUpIcon />;
    if (direction === "desc") return <KeyboardArrowDownIcon />;
    return <UnfoldMoreIcon sx={{ opacity: 0.5 }} />;
  };

  const handleSort = (column: Column<T>) => {
    if (sortable && column.sortable && onSort) {
      onSort(column.key);
    }
  };

  return (
    <Box
      component="thead"
      sx={{
        position: sticky ? "sticky" : "static",
        top: 0,
        zIndex: 1,
        backgroundColor: theme.colors.surface,
      }}
    >
      <Box component="tr">
        {selectable && (
          <Box
            component="th"
            sx={{
              padding: theme.spacing.md,
              backgroundColor: theme.colors.surface,
              borderBottom: `1px solid ${theme.colors.border}`,
              fontSize: theme.typography.header.fontSize,
              fontWeight: theme.typography.header.fontWeight,
              color: theme.colors.text,
              width: "48px",
              minWidth: "48px",
            }}
          >
            <Checkbox
              checked={isAllSelected}
              indeterminate={isSomeSelected}
              onChange={onSelectAll}
              size="sm"
              aria-label="Select all rows"
            />
          </Box>
        )}

        {columns.map((column) => (
          <Box
            key={String(column.key)}
            component="th"
            sx={
              {
                padding: theme.spacing.md,
                backgroundColor: theme.colors.surface,
                borderBottom: `1px solid ${theme.colors.border}`,
                fontSize: theme.typography.header.fontSize,
                fontWeight: theme.typography.header.fontWeight,
                color: theme.colors.text,
                textAlign: getColumnAlignment(column) as any,
                width: getColumnWidth(column),
                minWidth: column.minWidth as any,
                maxWidth: column.maxWidth as any,
                cursor: sortable && column.sortable ? "pointer" : "default",
                userSelect: "none",
                position: column.sticky ? "sticky" : "static",
                left: column.sticky ? 0 : "auto",
                zIndex: column.sticky ? 2 : 1,
                "&:hover":
                  sortable && column.sortable
                    ? {
                        backgroundColor: theme.colors.surfaceHover,
                      }
                    : {},
              } as any
            }
            onClick={() => handleSort(column)}
            role={sortable && column.sortable ? "button" : undefined}
            tabIndex={sortable && column.sortable ? 0 : undefined}
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                sortable &&
                column.sortable
              ) {
                e.preventDefault();
                handleSort(column);
              }
            }}
            aria-sort={
              getSortDirection && sortable && column.sortable
                ? getSortDirection(column.key) === "asc"
                  ? "ascending"
                  : getSortDirection(column.key) === "desc"
                    ? "descending"
                    : "none"
                : undefined
            }
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  getColumnAlignment(column) === "center"
                    ? "center"
                    : getColumnAlignment(column) === "right"
                      ? "flex-end"
                      : "flex-start",
                gap: theme.spacing.xs,
              }}
            >
              {column.headerRender ? column.headerRender() : column.label}
              {getSortIcon(column)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TableHeader;
