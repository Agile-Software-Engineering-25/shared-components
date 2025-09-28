# Table Component

A comprehensive, feature-rich table component built for React applications using MUI Joy. This component provides a powerful and flexible data table solution with responsive design, advanced filtering, sorting, pagination, and customization options.

## Features

- 🎨 **Responsive Design** - Automatically switches between desktop table and mobile card layouts
- 🔄 **Sorting** - Multi-column sorting with visual indicators
- 🔍 **Filtering** - Advanced filtering system with multiple filter types
- 📄 **Pagination** - Built-in pagination with customizable page sizes
- ✅ **Selection** - Single or multiple row selection with keyboard support
- 🎭 **Actions** - Row-level actions with dropdown menus
- 🎯 **Accessibility** - Full ARIA compliance and keyboard navigation
- 🎨 **Theming** - Customizable theming that integrates with MUI Joy
- 📱 **Mobile Optimized** - Optimized mobile experience with card-based layout
- ⚡ **Performance** - Optimized for large datasets with virtual scrolling support
- 🏗️ **Builder Pattern** - Easy configuration using a fluent builder API

## Examples

You can find example components that implement a table using this component. You can find the code of those examples in `src/componentsTable/examples`.

```js
import {
  TableExampleAdvanced,
  TableExampleBasic,
} from '@agile-software/shared-components';

<TableExampleAdvanced />
<TableExampleBasic />
```

## Basic Usage

```tsx
import React, { useState } from "react";
import {
  Table,
  createTableBuilder,
  DataItem,
} from "@agile-software/shared-components";

interface User extends DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

const MyTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const config = createTableBuilder<User>()
    .addColumn("name", "Name", { sortable: true })
    .addColumn("email", "Email", { sortable: true })
    .addColumn("role", "Role")
    .enableSelection("multiple", {
      selectedIds,
      onSelectionChange: setSelectedIds,
    })
    .enableSorting()
    .enablePagination()
    .build();

  return <Table data={users} config={config} />;
};
```

## Advanced Usage

```tsx
import React from "react";
import { Table, TableConfig } from "@agile-software/shared-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdvancedTable: React.FC = () => {
  const config: TableConfig<User> = {
    columns: [
      {
        key: "name",
        label: "Full Name",
        sortable: true,
        width: "200px",
        render: (value, user) => (
          <strong>
            {value} ({user.role})
          </strong>
        ),
      },
      {
        key: "email",
        label: "Email Address",
        sortable: true,
        align: "center",
      },
      {
        key: "role",
        label: "Role",
        render: (value) => (
          <span className={`role-${value.toLowerCase()}`}>{value}</span>
        ),
      },
    ],
    actions: [
      {
        key: "edit",
        label: "Edit User",
        icon: <EditIcon />,
        onClick: (user) => console.log("Edit", user),
        color: "primary",
      },
      {
        key: "delete",
        label: "Delete User",
        icon: <DeleteIcon />,
        onClick: (user) => console.log("Delete", user),
        color: "danger",
        disabled: (user) => user.role === "Admin",
      },
    ],
    selectable: {
      mode: "multiple",
      selectedIds: new Set(),
      onSelectionChange: (ids) => console.log("Selected:", ids),
    },
    sortable: true,
    filterable: true,
    filters: [
      {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Search by name...",
      },
      {
        key: "role",
        label: "Role",
        type: "select",
        options: [
          { label: "Admin", value: "Admin" },
          { label: "User", value: "User" },
        ],
      },
    ],
    pagination: {
      page: 1,
      pageSize: 10,
      total: users.length,
      showPageSizeSelector: true,
    },
    mobileConfig: {
      primaryField: "name",
      secondaryField: "email",
      tertiaryField: "role",
      showActions: true,
    },
    stickyHeader: true,
    onRowClick: (user) => console.log("Row clicked:", user),
  };

  return <Table data={users} config={config} />;
};
```

## API Reference

### Table Props

| Prop          | Type                  | Required | Description                    |
| ------------- | --------------------- | -------- | ------------------------------ |
| `data`        | `T[]`                 | ✅       | Array of data items to display |
| `config`      | `TableConfig<T>`      | ✅       | Table configuration object     |
| `className`   | `string`              | ❌       | Additional CSS class name      |
| `style`       | `React.CSSProperties` | ❌       | Inline styles                  |
| `data-testid` | `string`              | ❌       | Test identifier                |

### TableConfig

| Property            | Type                              | Description                 |
| ------------------- | --------------------------------- | --------------------------- |
| `columns`           | `Column<T>[]`                     | Column definitions          |
| `actions?`          | `Action<T>[]`                     | Row action definitions      |
| `selectable?`       | `SelectionConfig<T>`              | Selection configuration     |
| `sortable?`         | `boolean`                         | Enable sorting              |
| `filterable?`       | `boolean`                         | Enable filtering            |
| `filters?`          | `Filter<T>[]`                     | Filter definitions          |
| `pagination?`       | `PaginationConfig`                | Pagination configuration    |
| `mobileConfig?`     | `MobileTableConfig<T>`            | Mobile layout configuration |
| `loading?`          | `boolean`                         | Show loading state          |
| `empty?`            | `EmptyConfig`                     | Empty state configuration   |
| `stickyHeader?`     | `boolean`                         | Make header sticky          |
| `fullScreen?`       | `boolean`                         | Full screen mode            |
| `onRowClick?`       | `(row: T, index: number) => void` | Row click handler           |
| `onRowDoubleClick?` | `(row: T, index: number) => void` | Row double click handler    |
| `theme?`            | `Partial<TableTheme>`             | Custom theme overrides      |

### Column

| Property        | Type                               | Description                                                           |
| --------------- | ---------------------------------- | --------------------------------------------------------------------- |
| `key`           | `keyof T`                          | Data field key                                                        |
| `label`         | `string`                           | Column header label                                                   |
| `sortable?`     | `boolean`                          | Enable sorting for column                                             |
| `filterable?`   | `boolean`                          | Enable filtering for column                                           |
| `width?`        | `string \| number`                 | Column width                                                          |
| `minWidth?`     | `string \| number`                 | Minimum column width                                                  |
| `maxWidth?`     | `string \| number`                 | Maximum column width                                                  |
| `align?`        | `'left' \| 'center' \| 'right'`    | Text alignment                                                        |
| `render?`       | `(value, row, index) => ReactNode` | Custom render function                                                |
| `headerRender?` | `() => ReactNode`                  | Custom header render function                                         |
| `hideOnMobile?` | `boolean`                          | Hide column on mobile                                                 |
| `sticky?`       | `boolean`                          | Make column sticky (column stays visible when scrolling horizontally) |

### Action

| Property    | Type                                                           | Description       |
| ----------- | -------------------------------------------------------------- | ----------------- |
| `key`       | `string`                                                       | Action identifier |
| `label`     | `string`                                                       | Action label      |
| `icon?`     | `ReactNode`                                                    | Action icon       |
| `onClick`   | `(row: T, index: number) => void`                              | Click handler     |
| `disabled?` | `(row: T) => boolean`                                          | Disable condition |
| `hidden?`   | `(row: T) => boolean`                                          | Hide condition    |
| `color?`    | `'primary' \| 'neutral' \| 'danger' \| 'success' \| 'warning'` | Action color      |
| `variant?`  | `'solid' \| 'outlined' \| 'soft' \| 'plain'`                   | Action variant    |

### Filter

| Property        | Type                                                    | Description          |
| --------------- | ------------------------------------------------------- | -------------------- |
| `key`           | `keyof T`                                               | Data field key       |
| `label`         | `string`                                                | Filter label         |
| `type`          | `'text' \| 'select' \| 'date' \| 'number' \| 'boolean'` | Filter input type    |
| `options?`      | `Array<{label: string, value: any}>`                    | Select options       |
| `placeholder?`  | `string`                                                | Input placeholder    |
| `defaultValue?` | `any`                                                   | Default filter value |

## Hooks

The Table component provides several custom hooks for advanced usage:

### usePagination

```tsx
import { usePagination } from "@agile-software/shared-components";

const {
  page,
  pageSize,
  totalPages,
  hasNext,
  hasPrevious,
  goToPage,
  nextPage,
  previousPage,
  setPageSize,
} = usePagination({
  total: 100,
  initialPage: 1,
  initialPageSize: 10,
});
```

### useSelection

```tsx
import { useSelection } from "@agile-software/shared-components";

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
} = useSelection({
  data: users,
  mode: "multiple",
});
```

### useSort

```tsx
import { useSort } from "@agile-software/shared-components";

const { sortConfig, handleSort, clearSort, getSortDirection, isSorted } =
  useSort();
```

### useFilters

```tsx
import { useFilters } from "@agile-software/shared-components";

const {
  filterValues,
  setFilterValue,
  clearFilter,
  clearAllFilters,
  hasActiveFilters,
  activeFilterCount,
} = useFilters({
  filters: tableFilters,
});
```

## Builder Pattern

Use the table builder for easier configuration:

```tsx
import { createTableBuilder } from "@agile-software/shared-components";

const config = createTableBuilder<User>()
  .addColumn("name", "Name", { sortable: true, width: "200px" }) // add a column definition with width & sortable
  .addColumn("email", "Email", { sortable: true }) // add email column, sortable
  .addAction({
    // register a row action (button/menu item)
    key: "edit",
    label: "Edit",
    icon: <EditIcon />,
    onClick: (user) => editUser(user),
  })
  .enableSelection("multiple") // enable multi-row selection
  .enableSorting() // enable table sorting feature
  .enableFiltering() // enable filters UI and logic
  .addFilter({ key: "name", label: "Name", type: "text" }) // add a text filter for the name column
  .enablePagination({ pageSize: 20 }) // enable pagination with initial page size
  .configureMobile({
    // configure mobile-specific layout
    primaryField: "name",
    secondaryField: "email",
  })
  .onRowClick((user) => viewUser(user)) // add a row click handler
  .build();
```

## Theming

Customize the table appearance with theme overrides:

```tsx
const customTheme = {
  colors: {
    surface: "#ffffff",
    surfaceHover: "#f5f5f5",
    surfaceSelected: "#e3f2fd",
    border: "#e0e0e0",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#1976d2",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
};

const config: TableConfig<User> = {
  // ... other config
  theme: customTheme,
};
```

## Utility Functions

The Table component provides several utility functions for data manipulation and configuration:

### Data Processing

- **`sortData<T>(data, sortConfig)`** - Sort array of data items by specified configuration
- **`filterData<T>(data, filters)`** - Filter data items based on filter criteria
- **`paginateData<T>(data, page, pageSize)`** - Extract page slice from data array

### Helper Functions

- **`formatCellValue(value)`** - Format any value for display in table cells
- **`getColumnWidth(column)`** - Calculate column width from column configuration
- **`getColumnAlignment(column)`** - Get text alignment for column
- **`generateUniqueId()`** - Generate unique IDs for table elements

### Performance Utilities

- **`debounce(func, delay)`** - Debounce function calls (useful for search/filter inputs)
- **`throttle(func, limit)`** - Throttle function calls (useful for scroll handlers)

### Theme & Validation

- **`getDefaultTableTheme()`** - Get the default theme configuration
- **`mergeThemes(defaultTheme, customTheme)`** - Merge custom theme with defaults
- **`createFilterValidator<T>(filters)`** - Create validation function for filter values
- **`isValidFilterValue(value)`** - Check if a filter value is valid (not null/empty)

### Builder Pattern

- **`createTableBuilder<T>()`** - Create a fluent builder for table configuration

## Accessibility

The Table component includes comprehensive accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Logical focus order and visual indicators
- **Screen Reader Support**: Announcements for state changes
- **Role Attributes**: Semantic HTML with proper ARIA roles

## Performance

For large datasets, consider these optimization techniques:

- Use pagination to limit rendered rows
- Implement lazy loading with the `loading` prop
- Use `React.memo` for complex cell renderers
- Consider virtual scrolling for extremely large datasets
