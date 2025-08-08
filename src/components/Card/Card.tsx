import React from "react";
import {
  Card as JoyCard,
  CardProps as JoyCardProps,
  CardContent,
  Typography,
} from "@mui/joy";

export interface CardProps extends Omit<JoyCardProps, "variant"> {
  variant?: "soft" | "outlined" | "solid" | "plain";
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
}

/**
 * Renders a customizable card component using Joy UI's Card.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {string} [props.title] - The main title displayed at the top of the card.
 * @param {string} [props.subtitle] - An optional subtitle displayed below the title.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {"outlined" | "solid" | "plain" | "soft"} [props.variant="outlined"] - The visual style of the card.
 * @param {"sm" | "md" | "lg"} [props.size="md"] - The size of the card.
 * @param {"primary" | "neutral" | "danger" | "info" | "success" | "warning"} [props.color="neutral"] - The color theme of the card.
 * @returns {JSX.Element} The rendered Card component.
 */
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = "outlined",
  size = "md",
  color = "neutral",
  ...props
}) => {
  return (
    <JoyCard variant={variant} size={size} color={color} {...props}>
      <CardContent>
        {title && (
          <Typography level="title-lg" component="h2">
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography level="body-sm" color="neutral">
            {subtitle}
          </Typography>
        )}
        {children}
      </CardContent>
    </JoyCard>
  );
};

export default Card;
