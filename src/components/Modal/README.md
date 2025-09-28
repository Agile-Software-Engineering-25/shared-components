# Modal Component

A customizable modal dialog component with backdrop blur and drop shadow effects.

## Usage

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

## Props

- `header`: string - The title displayed at the top of the modal
- `open`: boolean - Controls whether the modal is visible
- `setOpen`: (open: boolean) => void - Function to control modal open/close state
- `disableEscape`: boolean (optional) - Whether to disable closing with escape key
- `modalSX`: SxProps (optional) - Additional styles for the modal backdrop
- `modalDialogSX`: SxProps (optional) - Additional styles for the modal dialog
- `children`: ReactNode - The content to be rendered inside the modal
