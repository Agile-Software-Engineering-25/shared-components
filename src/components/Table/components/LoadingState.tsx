import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/joy';
import { useTableTheme } from '../hooks';

interface LoadingStateProps {
  rows?: number;
  columns?: number;
  message?: string;
  variant?: 'spinner' | 'skeleton';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  rows = 5,
  columns = 4,
  message = 'Loading...',
  variant = 'skeleton',
}) => {
  const { theme } = useTableTheme();

  if (variant === 'spinner') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.xl,
          minHeight: '200px',
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 'var(--joy-radius-sm)',
          gap: theme.spacing.md,
        }}
        role="status"
        aria-label={message}
      >
        <CircularProgress size="lg" />
        <Typography
          level="body-md"
          sx={{ color: theme.colors.textSecondary }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 'var(--joy-radius-sm)',
        overflow: 'hidden',
      }}
      role="status"
      aria-label={message}
    >
      {/* Header skeleton */}
      <Box
        sx={{
          display: 'flex',
          padding: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.border}`,
          gap: theme.spacing.md,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height="24px"
            width={index === 0 ? '200px' : '120px'}
          />
        ))}
      </Box>

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            padding: theme.spacing.md,
            borderBottom: rowIndex < rows - 1 ? `1px solid ${theme.colors.border}` : 'none',
            gap: theme.spacing.md,
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              height="20px"
              width={
                colIndex === 0 ? '180px' : 
                colIndex === columns - 1 ? '60px' : '100px'
              }
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default LoadingState;