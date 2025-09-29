import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dropdown,
  MenuButton,
} from "@mui/joy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { DataItem, Action } from "../types";
import { useTableTheme } from "../hooks";

interface RowActionsProps<T extends DataItem> {
  row: T;
  index: number;
  actions: Action<T>[];
  size?: "sm" | "md" | "lg";
}

const RowActions = <T extends DataItem>({
  row,
  index,
  actions,
  size = "md",
}: RowActionsProps<T>) => {
  const { theme } = useTableTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row)
  );

  if (visibleActions.length === 0) {
    return null;
  }

  const handleActionClick = (action: Action<T>) => {
    if (action.disabled && action.disabled(row)) {
      return;
    }

    action.onClick(row, index);
    setMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  // If only one action, show it directly
  if (visibleActions.length === 1) {
    const action = visibleActions[0];
    const isDisabled = action.disabled && action.disabled(row);

    return (
      <IconButton
        size={size}
        variant={action.variant || "outlined"}
        color={action.color || "neutral"}
        disabled={isDisabled}
        onClick={(e) => {
          e.stopPropagation();
          handleActionClick(action);
        }}
        aria-label={action.label}
        title={action.label}
      >
        {action.icon}
      </IconButton>
    );
  }

  // Multiple actions - show dropdown menu
  return (
    <Dropdown open={menuOpen} onOpenChange={(_, open) => setMenuOpen(open)}>
      <MenuButton
        ref={buttonRef}
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            size,
            variant: "outlined",
            color: "neutral",
            // Remove manual onClick toggle, just stop propagation
            onClick: (e: React.MouseEvent) => e.stopPropagation(),
            "aria-label": "Row actions",
            "aria-expanded": menuOpen,
            "aria-haspopup": "menu",
          },
        }}
      >
        <MoreVertIcon />
      </MenuButton>

      <Menu
        placement="bottom-end"
        size={size}
        onKeyDown={handleKeyDown}
        sx={{
          minWidth: "160px",
          zIndex: 1000,
        }}
      >
        {visibleActions.map((action) => {
          const isDisabled = action.disabled && action.disabled(row);

          return (
            <MenuItem
              key={action.key}
              disabled={isDisabled}
              onClick={() => handleActionClick(action)}
              sx={{
                gap: theme.spacing.sm,
                color:
                  action.color === "danger"
                    ? theme.colors.danger
                    : theme.colors.text,
              }}
            >
              {action.icon && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {action.icon}
                </Box>
              )}
              {action.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Dropdown>
  );
};

export default RowActions;
