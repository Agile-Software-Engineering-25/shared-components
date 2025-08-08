import React from "react";
import { Button as JoyButton, ButtonProps as JoyButtonProps } from "@mui/joy";

export interface ButtonProps extends Omit<JoyButtonProps, "variant"> {
  variant?: "solid" | "soft" | "outlined" | "plain";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * A customizable button component built on top of Joy UI's `JoyButton`.
 *
 * @param children - The content to be displayed inside the button.
 * @param variant - The visual style of the button. Defaults to `"solid"`.
 * @param size - The size of the button. Defaults to `"md"`.
 * @param color - The color theme of the button. Defaults to `"primary"`.
 * @param loading - If `true`, displays a loading indicator and disables the button. Defaults to `false`.
 * @param fullWidth - If `true`, the button will take up the full width of its container. Defaults to `false`.
 * @param disabled - If `true`, disables the button. Automatically set to `true` when `loading` is `true`.
 * @param props - Additional props are spread to the underlying `JoyButton` component.
 *
 * @returns A styled button component with customizable appearance and behavior.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  color = "primary",
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <JoyButton
      variant={variant}
      size={size}
      color={color}
      loading={loading}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </JoyButton>
  );
};

export default Button;
