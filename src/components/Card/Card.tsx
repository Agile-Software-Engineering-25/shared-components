import React, { type ReactNode } from 'react';
import { Box, Button, Card as MuiCard, CardContent, Chip, Divider, Typography } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';

export interface CardProps {
  title?: string;
  subtitle?: string;
  chips?: Array<{
    label: string;
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    variant?: 'solid' | 'soft' | 'outlined' | 'plain';
    size?: 'sm' | 'md' | 'lg';
  }>;
  description?: string;
  image?: string;
  imageAlt?: string;
  icon?: ReactNode;
  imageButton?: {
    text: string;
    onClick: () => void;
    variant?: 'solid' | 'soft' | 'outlined' | 'plain';
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  };
  children?: ReactNode;
  cardSX?: SxProps;
  contentSX?: SxProps;
  titleSX?: SxProps;
  subtitleSX?: SxProps;
  chipsSX?: SxProps;
  descriptionSX?: SxProps;
  onClick?: () => void;
}

/**
 * A customizable card component for displaying content with optional image, title, and description.
 *
 * @param {CardProps} props - The props for the Card component
 * @param {string} [props.title] - Optional main title of the card
 * @param {string} [props.subtitle] - Optional subtitle below the title
 * @param {Array} [props.chips] - Optional array of chips to display below the title
 * @param {string} [props.description] - Optional description text
 * @param {string} [props.image] - Optional image URL to display above content
 * @param {string} [props.imageAlt] - Alt text for the image
 * @param {ReactNode} [props.icon] - Optional icon to display before the title
 * @param {object} [props.imageButton] - Optional button to display beside the image
 * @param {ReactNode} [props.children] - Optional additional content to render in the card body
 * @param {SxProps} [props.cardSX] - Additional styles for the card container
 * @param {SxProps} [props.contentSX] - Additional styles for the card content area
 * @param {SxProps} [props.titleSX] - Additional styles for the title
 * @param {SxProps} [props.subtitleSX] - Additional styles for the subtitle
 * @param {SxProps} [props.descriptionSX] - Additional styles for the description
 * @param {function} [props.onClick] - Optional click handler for the card
 * @returns {JSX.Element} The rendered Card component
 */
const GenericCard: React.FC<CardProps> = ({
  title,
  subtitle,
  chips,
  description,
  image,
  imageAlt,
  icon,
  imageButton,
  children,
  cardSX,
  contentSX,
  titleSX,
  subtitleSX,
  chipsSX,
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
            position: 'relative',
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
          {imageButton && (
            <Button
              variant={imageButton.variant || 'solid'}
              color={imageButton.color || 'primary'}
              size="sm"
              onClick={imageButton.onClick}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              {imageButton.text}
            </Button>
          )}
        </Box>
      )}
      <CardContent sx={{ p: 0, ...contentSX }}>
        {/* Card Header Section */}
        {(title || subtitle || chips) && (
          <Box sx={{ p: 2, pb: !image && (description || children) ? 0 : 2 }}>
            {title && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: (subtitle || chips) ? 0.5 : 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {icon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>}
                  <Typography
                    level="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: '#00122B',
                      userSelect: 'none',
                      lineHeight: 1.2,
                      ...titleSX,
                    }}
                  >
                    {title}
                  </Typography>
                </Box>

                {imageButton && !image && (
                  <Button
                    variant={imageButton.variant || 'outlined'}
                    color={imageButton.color || 'primary'}
                    size="sm"
                    onClick={imageButton.onClick}
                    sx={{
                      borderRadius: '8px',
                      px: 2,
                    }}
                  >
                    {imageButton.text}
                  </Button>
                )}
              </Box>
            )}

            {subtitle && (
              <Box sx={{ ml: icon ? 4 : 0 }}>
                <Typography
                  level="body-sm"
                  sx={{
                    color: '#314055',
                    mb: !image && (description || children) ? 1 : 0,
                    ...subtitleSX,
                  }}
                >
                  {subtitle}
                </Typography>
              </Box>
            )}

            {chips && chips.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  ml: icon ? 4 : 0,
                  mb: !image && (description || children) ? 1 : 0,
                  ...chipsSX,
                }}
              >
                {chips.map((chip, index) => (
                  <Chip
                    key={index}
                    color={chip.color || 'neutral'}
                    variant={chip.variant || 'soft'}
                    size={chip.size || 'sm'}
                  >
                    {chip.label}
                  </Chip>
                ))}
              </Box>
            )}

            {!image && (description || children) && (
              <Divider inset="none" sx={{ mt: (subtitle || chips) ? 0 : 1 }} />
            )}
          </Box>
        )}

        {/* Card Body Section */}
        {(description || children) && (
          <Box sx={{ p: 2, pt: (title || subtitle) && !image ? 1 : 2 }}>
            {description && (
              <Typography
                level="body-md"
                sx={{
                  color: 'text.secondary',
                  mb: children ? 2 : 0,
                  ...descriptionSX,
                }}
              >
                {description}
              </Typography>
            )}

            {children && (
              <Box>
                {children}
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default GenericCard;