import { useMemo } from 'react';
import type { TableTheme } from '../types';
import { getDefaultTableTheme, mergeThemes } from '../utils';

interface UseTableThemeProps {
  customTheme?: Partial<TableTheme>;
}

interface UseTableThemeReturn {
  theme: TableTheme;
  getThemeValue: (path: string) => string;
  createStyles: (styles: Record<string, any>) => Record<string, any>;
}

const useTableTheme = ({ customTheme }: UseTableThemeProps = {}): UseTableThemeReturn => {
  const theme = useMemo(() => {
    const defaultTheme = getDefaultTableTheme();
    if (!customTheme) return defaultTheme;
    return mergeThemes(defaultTheme, customTheme);
  }, [customTheme]);

  const getThemeValue = (path: string): string => {
    const keys = path.split('.');
    let value: any = theme;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        console.warn(`Theme path "${path}" not found`);
        return '';
      }
    }
    
    return String(value);
  };

  const createStyles = (styles: Record<string, any>) => {
    return Object.keys(styles).reduce((acc, key) => {
      const styleValue = styles[key];
      
      if (typeof styleValue === 'object') {
        acc[key] = createStyles(styleValue);
      } else if (typeof styleValue === 'string' && styleValue.startsWith('theme.')) {
        const themePath = styleValue.replace('theme.', '');
        acc[key] = getThemeValue(themePath);
      } else {
        acc[key] = styleValue;
      }
      
      return acc;
    }, {} as Record<string, any>);
  };

  return {
    theme,
    getThemeValue,
    createStyles,
  };
};

export default useTableTheme;