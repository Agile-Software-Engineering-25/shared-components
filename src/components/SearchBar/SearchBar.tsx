import React, { type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react';
import { Input, Box } from '@mui/joy';
import { Search as SearchIcon } from '@mui/icons-material';
import type { SxProps } from '@mui/joy/styles/types';

export type SearchBarSize = 'sm' | 'md' | 'lg';
export type SearchBarVariant = 'outlined' | 'soft' | 'plain';
export type SearchBarColor = 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
export type SearchBarMode = 'default' | 'disabled' | 'readOnly' | 'required';

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  mode?: SearchBarMode;
  error?: boolean;
  size?: SearchBarSize;
  variant?: SearchBarVariant;
  color?: SearchBarColor;
  fullWidth?: boolean;
  autoFocus?: boolean;
  clearOnSearch?: boolean;
  debounceMs?: number;
  maxLength?: number;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  inputSX?: SxProps;
  containerSX?: SxProps;
}

/**
 * A customizable search input component with search icon and configurable behavior.
 *
 * @param {SearchBarProps} props - The props for the SearchBar component
 * @param {string} [props.value] - Controlled value of the search input
 * @param {function} [props.onChange] - Callback fired when input value changes
 * @param {function} [props.onSearch] - Callback fired when search is triggered
 * @param {function} [props.onKeyDown] - Callback fired on key down events
 * @param {string} [props.placeholder="Search..."] - Placeholder text
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.readOnly=false] - Whether the input is read-only
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.error=false] - Whether the input has an error state
 * @param {SearchBarSize} [props.size="md"] - Size of the search bar
 * @param {SearchBarVariant} [props.variant="outlined"] - Visual variant
 * @param {SearchBarColor} [props.color="neutral"] - Color scheme
 * @param {boolean} [props.fullWidth=false] - Whether to take full width
 * @param {boolean} [props.autoFocus=false] - Whether to auto focus on mount
 * @param {boolean} [props.clearOnSearch=false] - Whether to clear input after search
 * @param {number} [props.debounceMs] - Debounce delay for onChange in milliseconds
 * @param {number} [props.maxLength] - Maximum character length
 * @param {ReactNode} [props.startDecorator] - Custom start decorator (overrides search icon)
 * @param {ReactNode} [props.endDecorator] - End decorator element
 * @param {SxProps} [props.inputSX] - Additional styles for input element
 * @param {SxProps} [props.containerSX] - Additional styles for container
 * @returns {JSX.Element} The rendered SearchBar component
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onKeyDown,
  placeholder = 'Placeholder...',
  mode = 'default',
  error = false,
  size = 'md',
  variant = 'outlined',
  color = 'neutral',
  fullWidth = false,
  autoFocus = false,
  clearOnSearch = false,
  debounceMs,
  maxLength,
  startDecorator,
  endDecorator,
  inputSX,
  containerSX,
}: SearchBarProps): JSX.Element => {
  const [internalValue, setInternalValue] = React.useState(value || '');
  const [debouncedValue, setDebouncedValue] = React.useState(internalValue);
  const debounceRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
      setDebouncedValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (debounceMs && onChange) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onChange(debouncedValue);
      }, debounceMs);

      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }
  }, [debouncedValue, debounceMs, onChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (debounceMs) {
      setDebouncedValue(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.key === 'Enter' && onSearch) {
      event.preventDefault();
      const searchValue = value !== undefined ? value : internalValue;
      onSearch(searchValue);

      if (clearOnSearch) {
        setInternalValue('');
        if (onChange) {
          onChange('');
        }
      }
    }
  };

  const defaultStartDecorator = (
    <SearchIcon
      fontSize='medium'
      color='inherit'
    />
  );

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto', ...containerSX }}>
      <Input
        value={value !== undefined ? value : internalValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={mode === 'disabled'}
        readOnly={mode === 'readOnly'}
        required={mode === 'required'}
        error={error}
        size={size}
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        slotProps={{
          input: {
            maxLength,
          },
        }}
        startDecorator={startDecorator || defaultStartDecorator}
        endDecorator={endDecorator}
        sx={{
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'background.level1',
          },
          '&:focus-within': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          ...inputSX,
        }}
      />
    </Box>
  );
};

export default SearchBar;
