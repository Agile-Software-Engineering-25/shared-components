# Dropzone Component

A simple, focused drag-and-drop file selection component. Handles file selection UI and passes selected files to the parent component for processing. Clean separation of concerns - the Dropzone handles file selection, you handle what to do with the files.

## Features

- **Drag & Drop Interface**: Intuitive drag-and-drop with visual feedback
- **File Type Filtering**: Optional browser-native file type restrictions
- **Single/Multiple Selection**: Support for single or multiple file selection
- **Internationalization**: Configurable text for all UI elements
- **Clean API**: Simple callback-based interface
- **TypeScript Support**: Full type safety

## Philosophy

This component follows the single responsibility principle:
- ✅ **Dropzone responsibility**: Handle file selection UI
- ❌ **Not Dropzone responsibility**: File state management, display, upload logic

The parent component decides what to do with selected files (display, upload, validate, etc.).

## Usage

### Basic Single File Selection

```tsx
import { Dropzone } from '@agile-software/shared-components';

function FileUploader() {
  const handleFileSelect = (file: File) => {
    console.log('Selected:', file.name);
    // Handle the selected file (upload, display, etc.)
  };

  return (
    <Dropzone onFileSelect={handleFileSelect} />
  );
}
```

### Multiple File Selection

```tsx
import { Dropzone } from '@agile-software/shared-components';

function MultiFileUploader() {
  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files.map(f => f.name));
    // Handle the selected files
  };

  return (
    <Dropzone
      multiple
      onFileSelect={handleFilesSelect}
    />
  );
}
```

### File Type Restrictions

```tsx
import { Dropzone } from '@agile-software/shared-components';

function ImageUploader() {
  const handleImageSelect = (file: File) => {
    console.log('Selected image:', file.name);
    // Handle the image file
  };

  return (
    <Dropzone
      types={['JPEG', 'PNG', 'GIF', 'WEBP']}
      onFileSelect={handleImageSelect}
    />
  );
}
```

### Complete Example with File Management

```tsx
import { Dropzone } from '@agile-software/shared-components';
import { FileChip } from '@agile-software/shared-components';
import { Box, Typography, Button } from '@mui/joy';
import { useState } from 'react';

function FileManager() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelect = (files: File[]) => {
    // Add new files to existing ones
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileDelete = (fileToDelete: File) => {
    setSelectedFiles(prev => prev.filter(file => file !== fileToDelete));
  };

  const handleUpload = async () => {
    // Your upload logic here
    console.log('Uploading:', selectedFiles);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        File Upload Manager
      </Typography>

      {/* File Selection */}
      <Dropzone
        multiple
        types={['PDF', 'DOC', 'DOCX', 'PNG', 'JPG']}
        onFileSelect={handleFilesSelect}
      />

      {/* File Display */}
      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            Selected Files ({selectedFiles.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {selectedFiles.map((file, index) => (
              <FileChip
                key={`${file.name}-${index}`}
                filename={file.name}
                onDelete={() => handleFileDelete(file)}
              />
            ))}
          </Box>

          <Button
            sx={{ mt: 2 }}
            onClick={handleUpload}
            disabled={selectedFiles.length === 0}
          >
            Upload {selectedFiles.length} Files
          </Button>
        </Box>
      )}
    </Box>
  );
}
```

### Internationalization

```tsx
import { Dropzone } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';

function LocalizedUploader() {
  const { t } = useTranslation();

  return (
    <Dropzone
      onFileSelect={(file) => console.log(file)}
      dragDropText={t('dropzone.dragDrop')}
      browseText={t('dropzone.browse')}
      allowedTypesText={t('dropzone.allowedTypes')}
    />
  );
}

// Or with static text
function GermanUploader() {
  return (
    <Dropzone
      types={['PDF', 'PNG']}
      onFileSelect={(file) => console.log(file)}
      dragDropText="Dateien hierher ziehen oder klicken"
      browseText="Dateien durchsuchen"
      allowedTypesText="Erlaubte Dateitypen"
    />
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFileSelect` | `(files: File \| File[]) => void` | **Required** | Callback when files are selected. Receives single File for single mode, File[] for multiple mode. |
| `types` | `string[]` | `undefined` | Array of allowed file extensions (e.g., `['PDF', 'PNG', 'JPG']`). Uses browser native filtering. |
| `multiple` | `boolean` | `false` | Enable multiple file selection. When true, user can select multiple files. |
| `dragDropText` | `string` | `"Drag & Drop files here or click to upload"` | Text displayed in the drag & drop area. |
| `browseText` | `string` | `"Browse Files"` | Text displayed on the browse button. |
| `allowedTypesText` | `string` | `"Allowed types"` | Prefix text for the allowed file types display. |

## Behavior

### File Selection
- **Single mode**: `onFileSelect` receives a single `File` object
- **Multiple mode**: `onFileSelect` receives an array of `File` objects
- Files are passed immediately when selected - no internal state management

### File Type Filtering
- Uses browser's native file type filtering
- Case-insensitive matching
- Invalid file types cannot be selected in the file picker
- Visual indication shows allowed types below the dropzone

### UI States
- **Default**: Shows drag & drop area with browse button
- **Hover**: Visual feedback when dragging files over the area
- **File types shown**: When `types` prop is provided, displays allowed formats

## Design Philosophy

### Single Responsibility
The Dropzone component has one job: **file selection**. It doesn't:
- Store file state (parent component handles this)
- Display selected files (use FileChip or custom components)
- Handle upload logic (parent component handles this)
- Manage file validation beyond type filtering

### Clean Integration
Works seamlessly with other components:

```tsx
// Dropzone for selection
<Dropzone onFileSelect={setFiles} />

// FileChip for display
{files.map(file =>
  <FileChip filename={file.name} onDelete={() => removeFile(file)} />
)}

// Your custom upload logic
<Button onClick={() => uploadFiles(files)}>Upload</Button>
```

## Common Patterns

### File Validation
```tsx
const handleFileSelect = (files: File[]) => {
  const validFiles = files.filter(file => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert(`${file.name} is too large`);
      return false;
    }
    return true;
  });
  setFiles(validFiles);
};

<Dropzone multiple onFileSelect={handleFileSelect} />
```

### Duplicate Prevention
```tsx
const handleFileSelect = (newFiles: File[]) => {
  const uniqueFiles = newFiles.filter(newFile =>
    !existingFiles.some(existing => existing.name === newFile.name)
  );
  setFiles(prev => [...prev, ...uniqueFiles]);
};
```

### File Preview
```tsx
const [files, setFiles] = useState<File[]>([]);
const [previews, setPreviews] = useState<string[]>([]);

const handleFileSelect = (files: File[]) => {
  setFiles(files);

  // Generate previews for images
  const imageFiles = files.filter(f => f.type.startsWith('image/'));
  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviews(prev => [...prev, e.target?.result as string]);
    };
    reader.readAsDataURL(file);
  });
};
```

## Best Practices

1. **Handle file selection immediately**: Process files in the `onFileSelect` callback
2. **Validate files in parent**: Size, type, and custom validation logic belong in the parent
3. **Provide user feedback**: Show loading states, errors, and success messages
4. **Use with FileChip**: For consistent file display across your application
5. **Consider file limits**: Implement size and count restrictions in your validation logic

## Related Components

- [FileChip](../FileChip/README.md) - For displaying selected files
- [Button](../Button/README.md) - For upload actions
- [Typography](../Typography/README.md) - For custom text display

## Dependencies

- `react-drag-drop-files`: Core drag-and-drop functionality
- `@mui/joy`: UI components and styling
- `@mui/icons-material`: Icons for the interface
