# Shared Components

A TypeScript-based React component library built with Material-UI Joy.

## Installation

Install the package with npm:

```bash
npm install @agile-software/shared-components
```

## Migration

If you are upgrading from an older version of @agile-software/shared-components, please see the full [Migration Guide](https://agile-software-engineering-25.github.io/documentation/docs/frontend/shared-components/migration-guide).

## Features

### Custom Themes

The library provides two fixed theme creators based on our design tokens (colors, typography, fonts):

- `createCustomJoyTheme()` → for [MUI Joy](https://mui.com/joy-ui/getting-started/overview/)
- `createCustomMuiTheme()` → for [MUI Material](https://mui.com/material-ui/getting-started/overview/)

⚠️ Important: These functions return fixed themes and do not accept configuration overrides.

Usage example:

```tsx
import React from "react";
import {
  createCustomJoyTheme,
  createCustomMuiTheme,
} from "@agile-software/shared-components";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { ThemeProvider } from "@mui/material/styles";
import { MATERIAL_THEME_ID } from "@mui/material/styles";

const joyTheme = createCustomJoyTheme();
const muiTheme = createCustomMuiTheme();

function App() {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: muiTheme }}>
      <JoyCssVarsProvider
        theme={joyTheme}
        defaultMode="light"
        modeStorageKey="joy-mode"
        colorSchemeStorageKey="joy-color-scheme"
      >
        {/* Your app content */}
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
}
```

## Available Components

> ⚠️ **Note on Buttons:**
This library does **not** provide custom shared button components.
Use the standard [Joy UI `Button`](https://mui.com/joy-ui/react-button/) or [Joy UI `IconButton`](https://mui.com/joy-ui/react-button/#icon-button) instead.
Any styling requirements should be handled through the theme or joy API.

- **[Modal](./src/components/Modal/README.md)** - Customizable modal dialog component with backdrop blur and drop shadow effects
- **[Accordion](./src/components/Accordion/README.md)** - Collapsible accordion component with multiple sections support
- **[SearchBar](./src/components/SearchBar/README.md)** - Highly configurable search input with debouncing and advanced features
- **[FileChip](./src/components/FileChip/README.md)** - Compact file display component with extension coloring, delete and download functionality
- **[Card](./src/components/Card/README.md)** - Highly configurable card

## Development

### Scripts

- `npm run build` - Build the library for production
- `npm run build:watch` - Build in watch mode for development
- `npm run dev` - Alias for build:watch
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Adding New Components

1. Create a new directory under `src/components/`
2. Add your component file (e.g., `MyComponent.tsx`)
3. Export from `src/index.ts`
4. Update this README

## Contributing

For contributing see the documentation: [Contriution Guide Docusaurus](https://agile-software-engineering-25.github.io/documentation/docs/frontend/shared-components/developing)

1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any problems reach out to Alexander Jablonowski (@EcoFreshKase) or Simon Dietrich (@py-bay).
