# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Build the Library

```bash
npm run build
```

## 3. Use in Your Frontend Project

### Option A: As a Submodule (Recommended)

In your frontend project:

```bash
# Add as submodule
git submodule add https://github.com/Agile-Software-Engineering-25/shared-components.git shared-components

# Go to submodule and build
cd shared-components
npm install
npm run build
cd ..

# Add to your package.json
# "dependencies": {
#   "@agile-software/shared-components": "file:./shared-components"
# }

# Install
npm install
```

### Option B: Link for Development

```bash
# In this directory
npm link

# In your frontend project
npm link @agile-software/shared-components
```

## 4. Use Components

```tsx
import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Button,
  Card,
  Input,
  createCustomTheme,
} from "@agile-software/shared-components";

const theme = createCustomTheme();

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Card title="Hello World">
        <Input label="Name" placeholder="Enter your name" />
        <Button>Submit</Button>
      </Card>
    </CssVarsProvider>
  );
}
```

## 5. Development Workflow

- Make changes to components
- Run `npm run build` to rebuild
- Changes will be reflected in your frontend project

For continuous development, use `npm run build:watch` instead.
