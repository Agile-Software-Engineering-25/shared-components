import React from "react";
import {
  Input as JoyInput,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import type { InputProps as JoyInputProps } from "@mui/joy";

export interface InputProps extends Omit<JoyInputProps, "variant"> {
  variant?: "soft" | "outlined" | "solid" | "plain";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

/**
 * Input component for rendering a styled input field with optional label, helper text, and error state.
 *
 * @param label - The label to display above the input field.
 * @param helperText - Additional helper text displayed below the input.
 * @param error - If true, displays the input in an error state.
 * @param required - If true, marks the input as required.
 * @param fullWidth - If true, the input will take up the full width of its container.
 * @param variant - The visual variant of the input. Defaults to "outlined".
 * @param size - The size of the input. Defaults to "md".
 * @param color - The color theme of the input. Defaults to "neutral".
 * @param props - Additional props passed to the underlying input component.
 *
 * @returns A styled input field with optional label and helper text.
 */
const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = false,
  required = false,
  fullWidth = false,
  variant = "outlined",
  size = "md",
  color = "neutral",
  ...props
}) => {
  const inputColor = error ? "danger" : color;

  return (
    <FormControl
      required={required}
      error={error}
      sx={fullWidth ? { width: "100%" } : undefined}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <JoyInput variant={variant} size={size} color={inputColor} {...props} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
