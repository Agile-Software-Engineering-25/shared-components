"# Shared Components

A TypeScript-based React component library built with Material-UI Joy, designed to be used as a submodule in frontend projects.

## Features

- 🎨 Built with **Material-UI Joy** for modern, accessible components
- 🔷 **TypeScript** support with full type definitions
- 📦 **NPM package** structure for easy installation
- 🔧 **Tree-shakable** exports for optimal bundle size
- 🧪 **Jest** testing setup with React Testing Library
- 📚 **Storybook** ready (optional)
- 🛠️ **ESLint** and **Prettier** configured
- 🔄 **Rollup** for optimized builds

## Installation

### As a Git Submodule

1. Add this repository as a submodule to your project:

```bash
git submodule add https://github.com/Agile-Software-Engineering-25/shared-components.git src/shared-components
git submodule update --init --recursive
```

2. Install dependencies in the submodule:

```bash
cd src/shared-components
npm install
```

3. Build the component library:

```bash
npm run build
```

4. In your main project's `package.json`, add a local dependency:

```json
{
  "dependencies": {
    "@agile-software/shared-components": "file:./src/shared-components"
  }
}
```

5. Install in your main project:

```bash
npm install
```

### As an NPM Package (Alternative)

If you publish to a private NPM registry:

```bash
npm install @agile-software/shared-components
```

## Usage

### Basic Setup

Wrap your application with the Joy UI theme provider:

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

### Using Components

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

## Theme Customization

Create and customize themes:

```tsx
import { createCustomTheme } from "@agile-software/shared-components";

const customTheme = createCustomTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: "#your-primary-color",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});
```

## Development

### Scripts

- `npm run build` - Build the library for production
- `npm run build:watch` - Build in watch mode for development
- `npm run dev` - Alias for build:watch
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.test.tsx
│   └── Input/
│       ├── Input.tsx
│       └── Input.test.tsx
├── theme/
│   └── theme.ts
└── index.ts
```

### Adding New Components

1. Create a new directory under `src/components/`
2. Add your component file (e.g., `MyComponent.tsx`)
3. Add tests (e.g., `MyComponent.test.tsx`)
4. Export from `src/index.ts`
5. Update this README

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Usage in Frontend Projects

### Step-by-step Integration

1. **Add as submodule** (in your frontend project root):

```bash
git submodule add https://github.com/Agile-Software-Engineering-25/shared-components.git shared-components
```

2. **Install dependencies**:

```bash
cd shared-components && npm install && npm run build && cd ..
```

3. **Add to package.json**:

```json
{
  "dependencies": {
    "@agile-software/shared-components": "file:./shared-components",
    "@mui/joy": "^5.0.0-beta.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

4. **Install and use**:

```bash
npm install
```

### Updating the Submodule

```bash
# Pull latest changes
git submodule update --remote shared-components

# Rebuild if needed
cd shared-components && npm run build && cd ..

# Reinstall in main project
npm install
```

## Dependencies

### Peer Dependencies

- React >= 17.0.0
- React DOM >= 17.0.0
- @mui/joy >= 5.0.0

### Development Dependencies

- TypeScript
- Rollup (for building)
- Jest (for testing)
- ESLint (for linting)
- React Testing Library

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new components
5. Ensure all tests pass
6. Submit a pull request

## Support

For questions or issues, please create an issue in the GitHub repository."
