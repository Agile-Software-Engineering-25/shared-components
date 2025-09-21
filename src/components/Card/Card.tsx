import React, { type ReactNode } from 'react';
import { Box, Card as MuiCard, CardContent, Typography } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  cardSX?: SxProps;
  contentSX?: SxProps;
  titleSX?: SxProps;
  descriptionSX?: SxProps;
  onClick?: () => void;
}

/**
 * A customizable card component for displaying content with optional image, title, and description.
 *
 * @param {CardProps} props - The props for the Card component
 * @param {string} [props.title] - Optional main title of the card
 * @param {string} [props.description] - Optional description text
 * @param {string} [props.image] - Optional image URL to display as background or cover
 * @param {string} [props.imageAlt] - Alt text for the image
 * @param {ReactNode} [props.children] - Optional additional content to render in the card body
 * @param {SxProps} [props.cardSX] - Additional styles for the card container
 * @param {SxProps} [props.contentSX] - Additional styles for the card content area
 * @param {SxProps} [props.titleSX] - Additional styles for the title
 * @param {SxProps} [props.descriptionSX] - Additional styles for the description
 * @param {function} [props.onClick] - Optional click handler for the card
 * @returns {JSX.Element} The rendered Card component
 */
const GenericCard: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt,
  children,
  cardSX,
  contentSX,
  titleSX,
  descriptionSX,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <MuiCard
      sx={{
        borderRadius: '10px',
        backgroundColor: '#f3f8ff',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
        } : {},
        overflow: 'hidden',
        ...cardSX,
      }}
      onClick={onClick}
    >
      {image && (
        <Box
          sx={{
            width: '100%',
            height: 200,
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt={imageAlt || title || 'Card image'}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
        </Box>
      )}
      <CardContent
        sx={{
          ...contentSX,
        }}
      >
        {title && (
          <Typography
            level="h4"
            sx={{
              fontWeight: 'md',
              color: 'primary.500',
              userSelect: 'none',
              ...titleSX,
            }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            level="body-md"
            sx={{
              mt: 1,
              color: 'text.secondary',
              ...descriptionSX,
            }}
          >
            {description}
          </Typography>
        )}

        {children && (
          <Box sx={{ mt: (title || description) ? (description ? 2 : 1) : 0 }}>
            {children}
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default GenericCard;