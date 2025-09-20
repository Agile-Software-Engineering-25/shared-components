import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Box, Button, IconButton, Typography } from '@mui/joy';
import  CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';

export interface DropzoneProps {
  types?: string[]; // default: alle Typen
  multiple?: boolean; // default: false
  showStatus?: boolean; // default: true
  onFileChange?: (file: File | null) => void;
  onUploadClick?: (file: File) => void; 
}

/**
 * A customizable modal dialog component with blur background and drop shadow.
 * 
 * @param {DropzoneProps} props - The props for the Dropzone component
 * @param {string[]} [props.types] - Allowed file types for upload (default: all types)
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file uploads
 * @param {boolean} [props.showStatus=true] - Whether to show the upload status
 * @param {function} [props.onFileChange] - Callback function when a file is selected or removed
 * @param {function} [props.onUploadClick] - Callback function when the upload button is clicked
 * @returns {JSX.Element} The rendered Dropzone component
 */


const FilePreview = ({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) => {
  return (
    <Box
      sx={{
        pl: 1,
        border: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        borderRadius: 'xl',
        minHeight: 30,
        display: 'inline-flex',
        width: 'fit-content',
        alignItems: 'center',
      }}
    >
      {file.name}

      <IconButton
        size="sm"
        variant="plain"
        color="neutral"
        aria-label="Auswahl löschen"
        onClick={onDelete}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
            '& svg': {
              color: 'gray', // X turns gray on hover
            },
          },
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </Box>
  );
};

const Dropzone: React.FC<DropzoneProps> = ({
  types,
  multiple,
  showStatus = true,
  onFileChange,
}: DropzoneProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (files: File | File[]) => {
    const first = Array.isArray(files) ? files[0] : (files ?? null);
    setFile(first ?? null);
    onFileChange?.(first ?? null);
  };

  const handleDelete = () => {
    setFile(null);
    onFileChange?.(null);
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={types}
        multiple={multiple}
      >
        <Box
          sx={{
              cursor: 'pointer',
              p: 3,
              border: '3px dashed',
              borderRadius: 'xl',
              textAlign: 'center',
              transition: 'all 120ms ease',
              borderColor: 'var(--joy-palette-primary-500)',
              backgroundColor: 'var(--joy-palette-primary-softBg)',
              '&:hover': {
                borderColor: 'var(--joy-palette-primary-outlinedBorder)',
                backgroundColor: 'var(--joy-palette-primary-softBg)'
              }
            }}
        >
          <Typography level="h4" sx={{ display: 'inline-flex', mb: 1, alignItems: 'center' }} color='primary'>
            <DownloadIcon sx={{ horizontalAlign: 'middle', mr: 1 }} />
            Ziehe etwas hierher oder lade deine Datei hoch
          </Typography>
          <Button sx={{ mt: 2 }}>
            <Typography level="body" sx={{ display: 'inline-flex', alignItems: 'center' }} color="secondary">
              Dateien Durchsuchen
              <SearchIcon sx={{ horizontalAlign: 'middle', ml: 1 }} />
            </Typography>
          </Button>
        </Box>
      </FileUploader>

      {/* {showStatus && (
        <Box sx={{ mt: 3, mb: 1 }}>
          {file ? (
            <FilePreview file={file} onDelete={handleDelete} />
          ) : (
            <Box sx={{ minHeight: 30, ml: 1 }}>Keine Datei ausgewählt</Box>
          )}
        </Box>
      )}
      <Button
              sx={{ mt: 2 }}
              onClick={() => {
                if (file) FileUploader(file);
              }}
              disabled={!file}
            >
              upload
      </Button> */}
    </>
  );
}

export default Dropzone;
