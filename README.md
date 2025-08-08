# Shared Components

A TypeScript-based React component library built with Material-UI Joy, designed to be used as a submodule in frontend projects.

## ⚠️Disclaimer⚠️

All Components and the joy theme in this repository are **ONLY** examples and **NEED** to be exchanged with real ones. Expect them to be deleted or massively changed.

## Installation

See the [frontend-template](https://github.com/Agile-Software-Engineering-25/frontend-template) project for how to use it. Other uses are not supported.

## Features

### Custom Joy Theme

The library exposes a custom them for `@mui/joy`. You can further customize the theme by passing an object to the function. Usage example:

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

### Custom Components

Many components will be exported by the library. Simply import and use them like any other component.

```tsx
import { Button, Card, Input } from "@agile-software/shared-components";

function MyComponent() {
  return (
    <Card title="Welcome" subtitle="Get started with our components">
      <Input label="Email" placeholder="Enter your email" required />
      <Button variant="solid" color="primary">
        Submit
      </Button>
    </Card>
  );
}
```

## Available Components

### Button

A customizable button component with multiple variants and states.

```tsx
import { Button } from '@agile-software/shared-components';

// Basic usage
<Button>Click me</Button>

// With props
<Button
  variant="outlined"
  color="danger"
  size="lg"
  loading={isLoading}
  fullWidth
>
  Submit
</Button>
```

**Props:**

- `variant`: 'solid' | 'soft' | 'outlined' | 'plain'
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
- `loading`: boolean
- `fullWidth`: boolean
- All standard button props

### Card

A container component for grouping related content.

```tsx
import { Card } from "@agile-software/shared-components";

<Card title="Card Title" subtitle="Optional subtitle" variant="outlined">
  <p>Card content goes here</p>
</Card>;
```

**Props:**

- `title`: string
- `subtitle`: string
- `variant`: 'soft' | 'outlined' | 'solid' | 'plain'
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'primary' | 'neutral' | 'danger' | 'success' | 'warning'

### Input

A form input component with label and validation support.

```tsx
import { Input } from "@agile-software/shared-components";

<Input
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  required
  error={hasError}
  fullWidth
/>;
```

**Props:**

- `label`: string
- `helperText`: string
- `error`: boolean
- `required`: boolean
- `fullWidth`: boolean
- `variant`: 'soft' | 'outlined' | 'solid' | 'plain'
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'primary' | 'neutral' | 'danger' | 'success' | 'warning'

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

For contributing see the documentation: [here will be a link to docusaurus](someLink)

1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any problems reach out to Alexander Jablonowski or Team 15.

## Todo

- add eslint config
