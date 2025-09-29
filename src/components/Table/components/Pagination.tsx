import React from 'react';
import { Box, Button, IconButton, Select, Option, Typography } from '@mui/joy';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import type { PaginationConfig } from '../types';
import { useTableTheme } from '../hooks';

interface PaginationProps {
  pagination: PaginationConfig;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  const { theme } = useTableTheme();
  const {
    page,
    pageSize,
    total,
    pageSizeOptions = [5, 10, 25, 50],
    showPageSizeSelector = true,
    showFirstLast = true,
  } = pagination;

  const totalPages = Math.ceil(total / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(totalPages, page + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (total === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
      }}
    >
      {/* Items info */}
      <Typography
        level="body-sm"
        sx={{ color: theme.colors.textSecondary, minWidth: 'fit-content' }}
      >
        Showing {startItem}-{endItem} of {total} items
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          flexWrap: 'wrap',
        }}
      >
        {/* Page size selector */}
        {showPageSizeSelector && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
          >
            <Typography level="body-sm" sx={{ color: theme.colors.textSecondary }}>
              Show:
            </Typography>
            <Select
              size="sm"
              value={pageSize}
              onChange={(_, value) => value && onPageSizeChange(value)}
              sx={{ minWidth: '80px' }}
            >
              {pageSizeOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
          {/* First page */}
          {showFirstLast && (
            <IconButton
              size="sm"
              variant="outlined"
              disabled={page <= 1}
              onClick={() => onPageChange(1)}
              aria-label="Go to first page"
            >
              <FirstPageIcon />
            </IconButton>
          )}

          {/* Previous page */}
          <IconButton
            size="sm"
            variant="outlined"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Go to previous page"
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          {/* Page numbers */}
          {generatePageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              size="sm"
              variant={pageNumber === page ? 'solid' : 'outlined'}
              color={pageNumber === page ? 'primary' : 'neutral'}
              onClick={() => onPageChange(pageNumber)}
              sx={{ minWidth: '32px' }}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Button>
          ))}

          {/* Next page */}
          <IconButton
            size="sm"
            variant="outlined"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Go to next page"
          >
            <KeyboardArrowRightIcon />
          </IconButton>

          {/* Last page */}
          {showFirstLast && (
            <IconButton
              size="sm"
              variant="outlined"
              disabled={page >= totalPages}
              onClick={() => onPageChange(totalPages)}
              aria-label="Go to last page"
            >
              <LastPageIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;