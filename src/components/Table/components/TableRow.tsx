import React, { type ReactNode } from "react";
import { Box, Checkbox } from "@mui/joy";
import type { DataItem } from "../types";
import { useTableTheme } from "../hooks";

interface TableRowProps<T extends DataItem> {
  row: T;
  index: number;
  children: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onClick?: (row: T, index: number) => void;
  onDoubleClick?: (row: T, index: number) => void;
  className?: string;
  expandable?: boolean;
  expanded?: boolean;
  onExpandToggle?: () => void;
}

const TableRow = <T extends DataItem>({
  row,
  index,
  children,
  selectable = false,
  selected = false,
  onSelect,
  onClick,
  onDoubleClick,
  className,
}: TableRowProps<T>) => {
  const { theme } = useTableTheme();

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger row click when clicking on checkbox or actions
    const target = e.target as HTMLElement;
    if (
      target.closest('[role="checkbox"]') ||
      target.closest("[data-table-action]")
    ) {
      return;
    }

    if (onClick) {
      onClick(row, index);
    }
  };

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(row, index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) {
        onClick(row, index);
      }
    }
  };

  return (
    <Box
      component="tr"
      className={className}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      sx={{
        backgroundColor: selected
          ? theme.colors.surfaceSelected
          : "transparent",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          backgroundColor: selected
            ? theme.colors.surfaceSelected
            : theme.colors.surfaceHover,
        },
        "&:focus": {
          outline: `2px solid ${theme.colors.primary}`,
          outlineOffset: "-2px",
        },
      }}
    >
      {selectable && (
        <Box
          component="td"
          sx={{
            padding: theme.spacing.md,
            width: "48px",
            minWidth: "48px",
          }}
        >
          <Checkbox
            checked={selected}
            onChange={onSelect}
            size="sm"
            aria-label={`Select row ${index + 1}`}
          />
        </Box>
      )}
      {children}
    </Box>
  );
};

export default TableRow;
