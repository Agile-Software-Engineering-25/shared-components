// Export components
export { default as Modal } from "./components/Modal/Modal";
export { default as SearchBar } from "./components/SearchBar/SearchBar";
export { default as Accordion } from "./components/Accordion/Accordion";
export { default as Card } from "./components/Card/Card";
export { Table } from "./components/Table";

export { default as TableExampleAdvanced } from "./components/Table/examples/AdvancedExample";
export { default as TableExampleBasic } from "./components/Table/examples/BasicExample";

// Export theme utilities
export { createCustomJoyTheme, createCustomMuiTheme } from "./theme/theme";

// Export table utilities
export * from "./components/Table/utils";
export * from "./components/Table/hooks";

// Export types
export type {
  SearchBarProps,
  SearchBarSize,
  SearchBarVariant,
  SearchBarColor,
} from "./components/SearchBar/SearchBar";
export type { ModalProps } from "./components/Modal/Modal";
export type {
  AccordionProps,
  AccordionItem,
} from "./components/Accordion/Accordion";
export type { CardProps } from "./components/Card/Card";

export * from "./components/Table/types";
