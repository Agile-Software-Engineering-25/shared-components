# Shared Components

A TypeScript-based React component library built with Material-UI Joy, designed to be used as a submodule in frontend projects.


## Installation

See the [frontend-template](https://github.com/Agile-Software-Engineering-25/frontend-template) project for how to use it. Other uses are not supported.

## Features

### Custom Joy Theme

The library exposes a custom theme for `@mui/joy`. You can further customize the theme by passing an object to the function. Usage example:

```tsx
import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { createCustomTheme } from "@agile-software/shared-components";

const theme = createCustomTheme();

function App() {
  return (
    <CssVarsProvider theme={theme}>{/* Your app content */}</CssVarsProvider>
  );
}
```

## Available Components

### Modal

A customizable modal dialog component with backdrop blur and drop shadow effects.

```tsx
import { Modal } from '@agile-software/shared-components';
import { useState } from 'react';

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

If you encounter any problems reach out to Alexander Jablonowski or Team 15.
