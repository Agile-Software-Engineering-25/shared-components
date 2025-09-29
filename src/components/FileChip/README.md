# FileChip Component

A compact, customizable file chip component that displays a filename in a pill-shaped container with optional file extension block, delete functionality, and onClick action. Features a modern design with rounded corners and smooth hover effects.

## Features

- File extension display as full-height colored block on the right
- Optional delete button (large X icon) with hover effects
- OnClick functionality on entire chip click
- Automatic file extension detection and coloring
- Filename truncation with ellipsis for long names
- Hover tooltip showing full filename
- Smooth hover animations and transitions
- TypeScript support with full type safety

## Usage

### Basic FileChip

```tsx
import { FileChip } from '@agile-software/shared-components';

function MyComponent() {
  return (
    <FileChip filename="document.pdf" />
  );
}
```

### FileChip without Extension Display

```tsx
import { FileChip } from '@agile-software/shared-components';

function MyComponent() {
  return (
    <FileChip
      filename="document.pdf"
      showFileExtension={false}
    />
  );
}
```

### Interactive FileChip with All Features

```tsx
import { FileChip } from '@agile-software/shared-components';

function FileManager() {
  const handleDelete = () => {
    console.log('Delete file');
  };

  const handleClick = () => {
    console.log('File clicked');
    // Handle file action
  };

  return (
    <FileChip
      filename="presentation.pptx"
      onDelete={handleDelete}
      onClick={handleClick}
    />
  );
}
```

### FileChip List Example

```tsx
import { FileChip } from '@agile-software/shared-components';
import { Box } from '@mui/joy';

interface FileData {
  id: string;
  name: string;
}

function FileList() {
  const files: FileData[] = [
    { id: '1', name: 'report.pdf' },
    { id: '2', name: 'image.jpg' },
    { id: '3', name: 'script.js' },
    { id: '4', name: 'data.xlsx' }
  ];

  const handleDeleteFile = (fileId: string) => {
    console.log('Deleting file:', fileId);
  };

  const handleFileClick = (fileName: string) => {
    console.log('File clicked:', fileName);
    // Handle file action
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {files.map(file => (
        <FileChip
          key={file.id}
          filename={file.name}
          onDelete={() => handleDeleteFile(file.id)}
          onClick={() => handleFileClick(file.name)}
          tooltip="Click to view"
        />
      ))}
    </Box>
  );
}
```

### Custom Styled FileChip

```tsx
import { FileChip } from '@agile-software/shared-components';

function CustomFileChip() {
  return (
    <FileChip
      filename="important-document.docx"
      containerSX={{
        backgroundColor: 'warning.50',
        border: '1px solid',
        borderColor: 'warning.200',
        '&:hover': {
          borderColor: 'warning.400',
          backgroundColor: 'warning.100'
        }
      }}
      extensionSX={{
        backgroundColor: 'warning.500'
      }}
    />
  );
}
```

### FileChip in Upload Component

```tsx
import { FileChip } from '@agile-software/shared-components';
import { Box, Typography } from '@mui/joy';

function FileUploader() {
  const uploadedFiles = ['resume.pdf', 'cover-letter.docx', 'portfolio.zip'];

  const handleRemoveFile = (filename: string) => {
    console.log('Removing file:', filename);
    // Remove from uploaded files
  };

  return (
    <Box>
      <Typography level="h4" sx={{ mb: 2 }}>
        Uploaded Files
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {uploadedFiles.map((filename, index) => (
          <FileChip
            key={index}
            filename={filename}
            onDelete={() => handleRemoveFile(filename)}
          />
        ))}
      </Box>
    </Box>
  );
}
```

### FileChip with Different File Types

```tsx
import { FileChip } from '@agile-software/shared-components';
import { Box, Typography } from '@mui/joy';

function FileTypeShowcase() {
  const fileExamples = [
    'document.pdf',
    'image.png',
    'script.js',
    'data.csv',
    'presentation.pptx',
    'archive.zip',
    'code.py',
    'stylesheet.css',
    'webpage.html'
  ];

  return (
    <Box>
      <Typography level="h4" sx={{ mb: 2 }}>
        Supported File Types
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {fileExamples.map((filename, index) => (
          <FileChip key={index} filename={filename} />
        ))}
      </Box>
    </Box>
  );
}
```
