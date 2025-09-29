import React from 'react';
import { Box, IconButton, Typography, useColorScheme } from '@mui/joy';
import { Close as CloseIcon } from '@mui/icons-material';
import type { SxProps } from '@mui/joy/styles/types';
import type { Theme } from '@mui/joy/styles';

const FILE_EXTENSION_COLORS: Record<string, keyof Theme['vars']['palette']> = {
  // Documents
  pdf: 'danger',
  doc: 'primary',
  docx: 'primary',
  txt: 'neutral',
  rtf: 'neutral',

  // Images
  jpg: 'success',
  jpeg: 'success',
  png: 'success',
  gif: 'success',
  svg: 'success',
  webp: 'success',

  // Code
  js: 'warning',
  ts: 'primary',
  jsx: 'primary',
  tsx: 'primary',
  py: 'primary',
  java: 'warning',
  cpp: 'primary',
  c: 'primary',
  html: 'danger',
  css: 'primary',

  // Archives
  zip: 'neutral',
  rar: 'neutral',
  tar: 'neutral',
  gz: 'neutral',

  // Spreadsheets
  xlsx: 'success',
  xls: 'success',
  csv: 'success',

  // Presentations
  pptx: 'warning',
  ppt: 'warning',

  // Default
  default: 'neutral'
};

export interface FileChipProps {
  filename: string;
  showFileExtension?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  containerSX?: SxProps;
  extensionSX?: SxProps;
}

const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return '';
  }
  return filename.substring(lastDotIndex + 1).toLowerCase();
};

const getFileNameWithoutExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return filename;
  }
  return filename.substring(0, lastDotIndex);
};

const getExtensionColor = (extension: string): keyof Theme['vars']['palette'] =>
  FILE_EXTENSION_COLORS[extension] || FILE_EXTENSION_COLORS.default;

/**
 * A file chip component that displays a filename in a pill-shaped container
 * with optional extension block, delete button, and download functionality.
 *
 * @param {FileChipProps} props - The props for the FileChip component
 * @param {string} props.filename - The filename to display with file extension
 * @param {boolean} [props.showFileExtension=true] - Whether to show the file extension as a colored block
 * @param {function} [props.onDelete] - Optional callback for delete action (shows X icon when provided)
 * @param {function} [props.onClick] - Optional callback for click action (entire chip becomes clickable)
 * @param {SxProps} [props.containerSX] - Additional styles for the chip container
 * @param {SxProps} [props.extensionSX] - Additional styles for the extension block
 * @returns {JSX.Element} The rendered FileChip component
 */
const FileChip: React.FC<FileChipProps> = ({
  filename,
  showFileExtension = true,
  onDelete,
  onClick,
  containerSX,
  extensionSX,
}: FileChipProps): JSX.Element => {
  const extension = getFileExtension(filename);
  const nameWithoutExtension = getFileNameWithoutExtension(filename);
  const displayName = showFileExtension && extension ? nameWithoutExtension : filename;
  const extensionColor = getExtensionColor(extension);
  const { mode } = useColorScheme();

  const chipContent = (
    <Box
      onClick={onClick ? onClick : undefined}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          transform: 'translateY(-1px)',
          boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.15)',
        } : {},
        width: 'fit-content',
        ...containerSX,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flex: 1,
          border: '2px solid',
          borderColor: 'primary.500',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          ...(!(showFileExtension && extension) && {
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
          }),
          ...(showFileExtension && extension && {
            borderRight: 'none',
          }),
        }}
      >
        {onDelete && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 1,
            }}
          >
            <IconButton
              size="lg"
              variant="plain"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              sx={{
                minWidth: '28px',
                minHeight: '28px',
                '&:hover': {
                  backgroundColor: 'danger.50',
                  color: 'danger.500',
                },
                '& svg': {
                  fontSize: '1.5rem',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            px: onDelete ? 1 : 2,
            py: 1,
          }}
        >
          <Typography
            level="body-md"
            sx={{
              fontWeight: 500,
              color: 'neutral',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '300px',
            }}
            title={filename}
          >
            {displayName}
          </Typography>
        </Box>
      </Box>

    {showFileExtension && extension && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${extensionColor}.solidBg`,
          fontWeight: 'bold',
          fontSize: '12px',
          textTransform: 'uppercase',
          minWidth: '50px',
          px: 1.5,
          border: '2px solid',
          borderColor: mode === 'light' ? `${extensionColor}.500` : 'primary.500',
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          borderLeft: 'none',
          ...extensionSX,
        }}
      >
        <Typography
          level="body-sm"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: `${extensionColor}.solidColor`,
          }}
        >
          {extension}
        </Typography>
      </Box>
)}

    </Box>
  );

  return chipContent;
};

export default FileChip;
