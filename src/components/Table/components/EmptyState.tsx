import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useTableTheme } from '../hooks';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data available',
  icon,
  action,
}) => {
  const { theme } = useTableTheme();

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
      }}
      role="status"
      aria-label="No data available"
    >
      <Box
        sx={{
          color: theme.colors.textSecondary,
          fontSize: '48px',
          marginBottom: theme.spacing.md,
        }}
      >
        {icon || <SearchOffIcon sx={{ fontSize: '48px' }} />}
      </Box>
      
      <Typography
        level="h4"
        sx={{
          color: theme.colors.textSecondary,
          marginBottom: action ? theme.spacing.md : 0,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
      
      {action && (
        <Button
          variant="outlined"
          color="primary"
          onClick={action.onClick}
          sx={{ marginTop: theme.spacing.sm }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;