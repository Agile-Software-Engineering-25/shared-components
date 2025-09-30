import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/joy";
import { Close as CloseIcon } from "@mui/icons-material";
import type { SxProps } from "@mui/joy/styles/types";
import type { Theme } from "@mui/joy/styles";

const FILE_EXTENSION_COLORS: Record<string, keyof Theme["vars"]["palette"]> = {
  // text
  doc: "primary",
  docx: "primary",
  pdf: "primary",
  txt: "primary",
  md: "primary",
  rtf: "primary",

  // tables and code
  csv: "success",
  json: "success",
  js: "success",
  ts: "success",
  jsx: "success",
  tsx: "success",
  py: "success",
  java: "success",
  cpp: "success",
  c: "success",
  html: "success",
  css: "success",
  xlsx: "success",
  xls: "success",

  // images, audio, video
  jpg: "warning",
  jpeg: "warning",
  png: "warning",
  svg: "warning",
  mp3: "warning",
  gif: "warning",
  wav: "warning",
  avi: "warning",
  mkv: "warning",
  mp4: "warning",
  webp: "warning",

  // presentation and zip-files
  ppt: "danger",
  pptx: "danger",
  zip: "danger",
  rar: "danger",
  tar: "danger",
  gz: "danger",
};
const DEFAULT_EXTENSION_COLOR = "#C2CAD5";

export interface FileChipProps {
  filename: string;
  showFileExtension?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  containerSX?: SxProps;
  extensionSX?: SxProps;
}

const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return "";
  }
  return filename.substring(lastDotIndex + 1).toLowerCase();
};

const getFileNameWithoutExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return filename;
  }
  return filename.substring(0, lastDotIndex);
};

const getExtensionColor = (
  extension: string
): keyof Theme["vars"]["palette"] | undefined =>
  FILE_EXTENSION_COLORS[extension];

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
  const displayName =
    showFileExtension && extension ? nameWithoutExtension : filename;
  const extensionColor = getExtensionColor(extension);
  const { mode } = useColorScheme();
  const theme = useTheme();

  const extensionTextColor = (() => {
    switch (true) {
      case mode === "dark" && extensionColor === "primary":
        return "#193039";
      case !!extensionColor:
        return `${extensionColor}.solidColor`;
      default:
        return theme.colorSchemes.light.palette.primary[500];
    }
  })();

  const chipContent = (
    <Box
      onClick={onClick ? onClick : undefined}
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease-in-out",
        "&:hover": onClick
          ? {
              transform: "translateY(-1px)",
              boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.15)",
            }
          : {},
        width: "fit-content",
        ...containerSX,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flex: 1,
          border: "2px solid",
          borderColor: mode === "light" ? "primary.500" : "neutral.200",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          ...(!(showFileExtension && extension) && {
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }),
          ...(showFileExtension &&
            extension && {
              borderRight: "none",
            }),
        }}
      >
        {onDelete && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
            }}
          >
            <IconButton
              size="lg"
              variant="plain"
              color={mode === "light" ? "primary" : "neutral"}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              sx={{
                minWidth: "28px",
                minHeight: "28px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "danger.500",
                },
                "& svg": {
                  fontSize: "1.5rem",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            px: onDelete ? 1 : 2,
            py: 1,
          }}
        >
          <Typography
            level="body-md"
            sx={{
              fontWeight: 500,
              color: "neutral",
              userSelect: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "300px",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: extensionColor
              ? `${extensionColor}.solidBg`
              : DEFAULT_EXTENSION_COLOR,
            fontWeight: "bold",
            fontSize: "12px",
            textTransform: "uppercase",
            minWidth: "50px",
            px: 1.5,
            border: "2px solid",
            borderColor: mode === "light" ? "primary.500" : "neutral.200",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            borderLeft: "none",
            ...extensionSX,
          }}
        >
          <Typography
            level="body-sm"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: extensionTextColor,
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
