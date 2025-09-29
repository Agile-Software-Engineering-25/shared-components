// Export components
export { default as Modal } from './components/Modal/Modal';
export { default as Dropzone } from './components/Dropzone/Dropzone';
export { default as SearchBar } from './components/SearchBar/SearchBar';
export { default as Accordion } from './components/Accordion/Accordion';
export { default as Card } from './components/Card/Card';
export { default as FileChip } from './components/FileChip/FileChip';

// Export types
export type {
  SearchBarProps,
  SearchBarSize,
  SearchBarVariant,
  SearchBarColor
} from './components/SearchBar/SearchBar';
export type { ModalProps } from './components/Modal/Modal';
export type { DropzoneProps } from './components/Dropzone/Dropzone';
export type { AccordionProps, AccordionItem } from './components/Accordion/Accordion';
export type { CardProps } from './components/Card/Card';
export type { FileChipProps } from './components/FileChip/FileChip';

// Export theme utilities
export { createCustomJoyTheme, createCustomMuiTheme } from './theme/theme';
