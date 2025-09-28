# SearchBar Component

A highly configurable search input component with built-in search icon and advanced features like debouncing, search on enter, and customizable styling.

## Basic Usage

```tsx
import { SearchBar } from "@agile-software/shared-components";
import { useState } from "react";

function MyComponent() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Perform search logic here
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <SearchBar
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      placeholder="Search products..."
      size="md"
      variant="outlined"
      color="primary"
      searchOnEnter={true}
      fullWidth
    />
  );
}
```

## Advanced Usage with Custom Styling

```tsx
import { SearchBar } from "@agile-software/shared-components";
import { Button, Chip } from "@mui/joy";
import { FilterList } from "@mui/icons-material";

function AdvancedSearchExample() {
  return (
    <SearchBar
      placeholder="Search with filters..."
      size="lg"
      variant="soft"
      color="neutral"
      endDecorator={
        <Button
          variant="plain"
          size="sm"
          startDecorator={<FilterList />}
        >
          Filters
        </Button>
      }
      searchIconSX={{ color: 'primary.500' }}
      inputSX={{
        backgroundColor: 'background.surface',
        '&:hover': { backgroundColor: 'background.level1' }
      }}
      onSearch={(value) => console.log('Advanced search:', value)}
      clearOnSearch={false}
      maxLength={100}
    />
  );
}
```

## Props

### Basic Props
- `value`: string (optional) - Controlled value of the search input
- `onChange`: (value: string) => void (optional) - Callback fired when input value changes
- `onSearch`: (value: string) => void (optional) - Callback fired when search is triggered
- `onKeyDown`: (event: KeyboardEvent) => void (optional) - Callback fired on key down events
- `placeholder`: string (optional, default: "Search...") - Placeholder text
- `disabled`: boolean (optional, default: false) - Whether the input is disabled
- `readOnly`: boolean (optional, default: false) - Whether the input is read-only
- `required`: boolean (optional, default: false) - Whether the input is required
- `error`: boolean (optional, default: false) - Whether the input has an error state

### Appearance Props
- `size`: "sm" | "md" | "lg" (optional, default: "md") - Size of the search bar
- `variant`: "outlined" | "soft" | "plain" (optional, default: "outlined") - Visual variant
- `color`: "primary" | "neutral" | "danger" | "success" | "warning" (optional, default: "neutral") - Color scheme
- `fullWidth`: boolean (optional, default: false) - Whether to take full width
- `autoFocus`: boolean (optional, default: false) - Whether to auto focus on mount

### Behavior Props
- `clearOnSearch`: boolean (optional, default: false) - Whether to clear input after search
- `searchOnEnter`: boolean (optional, default: true) - Whether to trigger search on Enter key
- `debounceMs`: number (optional) - Debounce delay for onChange in milliseconds (use 50-100ms for API calls, omit for instant feedback)
- `maxLength`: number (optional) - Maximum character length

### Customization Props
- `startDecorator`: ReactNode (optional) - Custom start decorator (overrides search icon)
- `endDecorator`: ReactNode (optional) - End decorator element
- `searchIconSX`: SxProps (optional) - Additional styles for search icon
- `inputSX`: SxProps (optional) - Additional styles for input element
- `containerSX`: SxProps (optional) - Additional styles for container

## Type Exports
- `SearchBarProps` - Props interface for the SearchBar component
- `SearchBarSize` - Union type for size options
- `SearchBarVariant` - Union type for variant options
- `SearchBarColor` - Union type for color options
