// Export components
export { default as Modal } from './components/Modal/Modal';
export { default as SearchBar } from './components/SearchBar/SearchBar';

// Export types
export type { ModalProps } from './components/Modal/Modal';
export type {
  SearchBarProps,
  SearchBarSize,
  SearchBarVariant,
  SearchBarColor
} from './components/SearchBar/SearchBar';

// Export theme utilities
export { createCustomJoyTheme, createCustomMuiTheme } from './theme/theme';
