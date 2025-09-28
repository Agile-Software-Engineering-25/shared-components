import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Box, Button, Typography } from '@mui/joy';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';

export interface DropzoneProps {
  types?: string[];
  multiple?: boolean;
  onFileSelect: (files: File | File[]) => void;
  dragDropText?: string;
  browseText?: string;
  allowedTypesText?: string;
}

/**
 * A simple drag-and-drop file selection component.
 * Handles file selection and passes files to parent component for processing.
 *
 * @param {DropzoneProps} props - The props for the Dropzone component
 * @param {string[]} [props.types] - Allowed file types for selection (default: all types)
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file selection
 * @param {function} props.onFileSelect - Callback function when files are selected
 * @param {string} [props.dragDropText] - Text for drag & drop area
 * @param {string} [props.browseText] - Text for browse button
 * @param {string} [props.allowedTypesText] - Text prefix for allowed types
 * @returns {JSX.Element} The rendered Dropzone component
 */
const Dropzone: React.FC<DropzoneProps> = ({
  types,
  multiple = false,
  onFileSelect,
  dragDropText = "Drag & Drop files here or click to upload",
  browseText = "Browse Files",
  allowedTypesText = "Allowed types",
}: DropzoneProps): JSX.Element => {

  return (
    <FileUploader
      handleChange={onFileSelect}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          {dragDropText}
        </Typography>
        <Button sx={{ mt: 2, alignSelf: 'center' }}>
          <Typography level="body-md" sx={{ display: 'inline-flex', alignItems: 'center' }} color='white'>
            {browseText}
            <SearchIcon sx={{ horizontalAlign: 'middle', ml: 1 }} />
          </Typography>
        </Button>
        {types && types.length > 0 && (
          <Typography level="body-sm" sx={{ mt: 1, opacity: 0.7 }} color="neutral">
            {allowedTypesText}: {types.join(', ')}
          </Typography>
        )}
      </Box>
    </FileUploader>
  );
}

export default Dropzone;
