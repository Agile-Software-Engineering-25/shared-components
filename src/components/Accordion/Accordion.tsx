import React, {type ReactNode, useEffect, useState} from 'react';
import { Box, Typography, Accordion as MuiAccordion, AccordionDetails, AccordionGroup, AccordionSummary } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface AccordionItem {
  id: string;
  header: string;
  children: ReactNode;
  expand?: boolean;
  onChange?: (isExpanded: boolean) => void;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultExpanded?: string | string[];
  accordionSX?: SxProps;
  accordionGroupSX?: SxProps;
  headerSX?: SxProps;
}

/**
 * A customizable accordion component with collapsible sections.
 *
 * @param {AccordionProps} props - The props for the Accordion component
 * @param {AccordionItem[]} props.items - Array of accordion items with id, header, and children
 * @param {boolean} [props.multiple=false] - Whether multiple sections can be open simultaneously
 * @param {string|string[]} [props.defaultExpanded] - Default expanded section(s)
 * @param {SxProps} [props.accordionSX] - Additional styles for individual accordion items
 * @param {SxProps} [props.accordionGroupSX] - Additional styles for the accordion group
 * @param {SxProps} [props.headerSX] - Additional styles for accordion headers
 * @returns {JSX.Element} The rendered Accordion component
 */
const GenericAccordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultExpanded,
  accordionSX,
  accordionGroupSX,
  headerSX,
}: AccordionProps): JSX.Element => {
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    if (defaultExpanded) {
      return Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded];
    }
    return [];
  });

  useEffect(() => {
    const externallyExpanded = items
        .filter((item) => item.expand)
        .map((item) => item.id);

    if (externallyExpanded.length > 0) {
      if (multiple) {
        setExpandedItems((prev) => Array.from(new Set([...prev, ...externallyExpanded])));
      } else {
        setExpandedItems([externallyExpanded[0]]);
      }
    }
  }, [items, multiple]);

  const handleToggle = (itemId: string, onChange?: (expanded: boolean) => void) => {
    setExpandedItems(prev => {
      let newExpanded: string[];

      if (multiple) {
        return prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId];
      } else {
        newExpanded = prev.includes(itemId) ? [] : [itemId];
      }
      if (onChange) onChange(newExpanded.includes(itemId));
      return newExpanded;
    });
  };

  return (
    <AccordionGroup
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        ...accordionGroupSX,
      }}
    >
      {items.map((item) => {
        const isExpanded =
            typeof item.expand === 'boolean'
                ? item.expand
                : expandedItems.includes(item.id);

        return (
          <MuiAccordion
            key={item.id}
            expanded={isExpanded}
            onChange={() => handleToggle(item.id, item.onChange)}
            sx={{
              ...accordionSX,
            }}
          >
            <AccordionSummary
              indicator={
                <KeyboardArrowDownIcon
                  color='primary'
                  fontSize='large'
                />
              }
            >
              <Typography
                level="h3"
                m={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  userSelect: 'none',
                  fontWeight: 'md',
                  color: 'primary.500',
                  ...headerSX,
                }}
              >
                {item.header}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 1, marginLeft: 2 }}>
                {item.children}
              </Box>
            </AccordionDetails>
          </MuiAccordion>
        );
      })}
    </AccordionGroup>
  );
};

export default GenericAccordion;
