# Shared Components

A TypeScript-based React component library built with Material-UI Joy.

## Installation

Install the package with npm:

```bash
npm install @agile-software/shared-components
```

## Migration

If you are upgrading from an older version of @agile-software/shared-components, please see the full [Migration Guide](https://agile-software-engineering-25.github.io/documentation/docs/frontend/shared-components/migration-guide).## Features

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

### Modal

A customizable modal dialog component with backdrop blur and drop shadow effects.

```tsx
import { Modal } from "@agile-software/shared-components";
import { useState } from "react";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        header="Modal Title"
        open={open}
        setOpen={setOpen}
        disableEscape={false}
      >
        <p>Modal content goes here</p>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </>
  );
}
```

**Props:**

- `header`: string - The title displayed at the top of the modal
- `open`: boolean - Controls whether the modal is visible
- `setOpen`: (open: boolean) => void - Function to control modal open/close state
- `disableEscape`: boolean (optional) - Whether to disable closing with escape key
- `modalSX`: SxProps (optional) - Additional styles for the modal backdrop
- `modalDialogSX`: SxProps (optional) - Additional styles for the modal dialog
- `children`: ReactNode - The content to be rendered inside the modal

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
