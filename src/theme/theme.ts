import { extendTheme, ThemeInput } from '@mui/joy/styles';

/**
 * Creates a custom Joy UI theme based on the design system
 * @param customizations Optional theme customizations to override defaults
 * @returns Extended Joy UI theme
 */
export const createCustomTheme = (customizations?: ThemeInput) => {
  const baseTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          // Primary colors (Blue)
          primary: {
            '50': '#E8F2FF',
            '100': '#CCD5E2',
            '200': '#809BB6',
            '300': '#809BB6',
            '400': '#405A80',
            '500': '#002E6D', // Primary 100%
            '600': '#002E6D',
            '700': '#00245A',
            '800': '#001A47',
            '900': '#001034',
            solidBg: '#002E6D',
            solidHoverBg: '#00245A',
            solidActiveBg: '#001A47',
            solidDisabledBg: '#CCD5E2',
            solidColor: '#FFFFFF',
            plainColor: '#002E6D',
            plainHoverBg: '#E8F2FF',
            plainActiveBg: '#CCD5E2',
            outlinedBorder: '#809BB6',
            outlinedColor: '#002E6D',
            outlinedHoverBg: '#E8F2FF',
            softBg: '#E8F2FF',
            softColor: '#002E6D',
            softHoverBg: '#CCD5E2'
          },
          
          // Neutral colors (Grey scale)
          neutral: {
            '50': '#F3F8FF',
            '100': '#FFFFFF',
            '200': '#C2CAD5',
            '300': '#798595',
            '400': '#798595',
            '500': '#314055', // Grey 80%
            '600': '#00122B',
            '700': '#00122B',
            '800': '#1A1A1A',
            '900': '#000000',
            plainColor: '#314055',
            plainHoverBg: '#F3F8FF',
            outlinedBorder: '#798595',
            outlinedColor: '#314055'
          },
          
          // Success colors (Green)
          success: {
            '50': '#E8F5E8',
            '100': '#CFDECF',
            '200': '#87AC88',
            '300': '#87AC88',
            '400': '#4C7A4F',
            '500': '#0E5910', // Success 100%
            '600': '#0E5910',
            '700': '#0B470D',
            '800': '#08350A',
            '900': '#052407',
            solidBg: '#0E5910',
            solidColor: '#FFFFFF',
            plainColor: '#0E5910',
            outlinedBorder: '#87AC88'
          },
          
          // Danger colors (Red)
          danger: {
            '50': '#FEED1DA',
            '100': '#EED1DA',
            '200': '#D58DA2',
            '300': '#D58DA2',
            '400': '#AC1B44',
            '500': '#AC1B44', // Danger 100%
            '600': '#8F1336',
            '700': '#8F1336',
            '800': '#6D0F28',
            '900': '#4A0A1A',
            solidBg: '#AC1B44',
            solidColor: '#FFFFFF',
            plainColor: '#AC1B44',
            outlinedBorder: '#D58DA2'
          },
          
          // Warning colors (Brown)
          warning: {
            '50': '#E7DBD0',
            '100': '#E7DBD0',
            '200': '#C3A588',
            '300': '#C3A588',
            '400': '#9F6E35',
            '500': '#874D12', // Warning 100%
            '600': '#874D12',
            '700': '#6D3E0E',
            '800': '#532F0B',
            '900': '#3A2107',
            solidBg: '#874D12',
            solidColor: '#FFFFFF',
            plainColor: '#874D12',
            outlinedBorder: '#C3A588'
          },
          
          // Background colors
          background: {
            body: '#FFFFFF',
            surface: '#F3F8FF',
            popup: '#FFFFFF',
            level1: '#FFFFFF',
            level2: '#F3F8FF',
            level3: '#E8F2FF',
            tooltip: '#1A1A1A'
          },
          
          // Text colors
          text: {
            primary: '#00122B', // Text/Light/Primary
            secondary: '#314055', // Text/Light/Secondary  
            tertiary: '#798595', // Text/Light/Disabled
            icon: '#314055'
          },
          
          // Divider colors
          divider: '#C2CAD5',
          
          // Focus ring
          focusVisible: '#00ACE9' // Text/Dark/Link
        }
      },
      dark: {
        palette: {
          // Primary colors remain similar but adjusted for dark mode
          primary: {
            '50': '#001034',
            '100': '#001A47',
            '200': '#00245A',
            '300': '#002E6D',
            '400': '#405A80',
            '500': '#809BB6',
            '600': '#CCD5E2',
            '700': '#E8F2FF',
            '800': '#F0F8FF',
            '900': '#FFFFFF',
            solidBg: '#002E6D',
            solidColor: '#FFFFFF',
            plainColor: '#809BB6',
            outlinedBorder: '#405A80'
          },
          
          neutral: {
            '50': '#000000',
            '100': '#1A1A1A',
            '200': '#00122B',
            '300': '#314055',
            '400': '#798595',
            '500': '#C2CAD5',
            '600': '#F3F8FF',
            '700': '#FFFFFF',
            '800': '#FFFFFF',
            '900': '#FFFFFF',
            plainColor: '#C2CAD5',
            outlinedBorder: '#314055'
          },
          
          success: {
            '50': '#052407',
            '100': '#08350A',
            '200': '#0B470D',
            '300': '#0E5910',
            '400': '#4C7A4F',
            '500': '#87AC88',
            '600': '#CFDECF',
            '700': '#E8F5E8',
            '800': '#F0F8F0',
            '900': '#FFFFFF',
            solidBg: '#0E5910',
            solidColor: '#FFFFFF',
            plainColor: '#87AC88'
          },
          
          danger: {
            '50': '#4A0A1A',
            '100': '#6D0F28',
            '200': '#8F1336',
            '300': '#AC1B44',
            '400': '#D58DA2',
            '500': '#EED1DA',
            '600': '#FEED1DA',
            '700': '#FFF0F2',
            '800': '#FFF8F9',
            '900': '#FFFFFF',
            solidBg: '#AC1B44',
            solidColor: '#FFFFFF',
            plainColor: '#EED1DA'
          },
          
          warning: {
            '50': '#3A2107',
            '100': '#532F0B',
            '200': '#6D3E0E',
            '300': '#874D12',
            '400': '#9F6E35',
            '500': '#C3A588',
            '600': '#E7DBD0',
            '700': '#F2ECE5',
            '800': '#F8F5F2',
            '900': '#FFFFFF',
            solidBg: '#874D12',
            solidColor: '#FFFFFF',
            plainColor: '#C3A588'
          },
          
          background: {
            body: '#000000',
            surface: '#1A1A1A',
            popup: '#00122B',
            level1: '#1A1A1A',
            level2: '#00122B',
            level3: '#314055',
            tooltip: '#FFFFFF'
          },
          
          text: {
            primary: '#FFFFFF',
            secondary: '#C2CAD5',
            tertiary: '#798595',
            icon: '#C2CAD5'
          },
          
          divider: '#314055',
          focusVisible: '#00ACE9'
        }
      }
    },
    
    // Typography settings
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: {
        xs: 400,
        sm: 500,
        md: 600,
        lg: 700,
        xl: 800
      },
      fontSize: {
        xs: '0.75rem',   // 12px
        sm: '0.875rem',  // 14px
        md: '1rem',      // 16px
        lg: '1.125rem',  // 18px
        xl: '1.25rem',   // 20px
        xl2: '1.5rem',   // 24px
        xl3: '1.875rem', // 30px
        xl4: '2.25rem'   // 36px
      },
      lineHeight: {
        xs: 1.33334,
        sm: 1.42858,
        md: 1.5,
        lg: 1.55556,
        xl: 1.6,
        xl2: 1.33334,
        xl3: 1.2,
        xl4: 1.11112
      }
    },
    
    // Spacing scale (consistent with 4px base unit)
    spacing: (factor: number) => `${0.25 * factor}rem`, // 4px base unit
    
    // Border radius
    radius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px'
    },
    
    // Shadow system
    shadow: {
      xs: '0 1px 2px 0 rgba(0, 18, 43, 0.05)',
      sm: '0 1px 3px 0 rgba(0, 18, 43, 0.1), 0 1px 2px 0 rgba(0, 18, 43, 0.06)',
      md: '0 4px 6px -1px rgba(0, 18, 43, 0.1), 0 2px 4px -1px rgba(0, 18, 43, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 18, 43, 0.1), 0 4px 6px -2px rgba(0, 18, 43, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 18, 43, 0.1), 0 10px 10px -5px rgba(0, 18, 43, 0.04)'
    },
    
    // Component customizations
    components: {
      JoyButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderRadius: theme.vars.radius.md,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600, // SemiBold for all buttons
            fontSize: {
              sm: '0.875rem', // 14px for small buttons
              md: '0.875rem', // 14px for medium buttons  
              lg: '1rem'      // 16px for large buttons
            }[ownerState.size || 'md'],
            lineHeight: 1.0, // 100% line-height
            letterSpacing: '0%',
            minHeight: {
              sm: '32px',
              md: '40px',
              lg: '48px'
            }[ownerState.size || 'md'],
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:focus-visible': {
              outline: `2px solid ${theme.vars.palette.focusVisible}`,
              outlineOffset: '2px'
            }
          })
        }
      },
      
      JoyCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.vars.radius.lg,
            boxShadow: theme.vars.shadow.sm
          })
        }
      },
      
      JoyInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.vars.radius.md,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 300, // Light for input text
            fontSize: '1rem', // 16px
            lineHeight: 1.0,
            letterSpacing: '0%',
            '&:focus-within': {
              boxShadow: `0 0 0 2px ${theme.vars.palette.focusVisible}40`
            }
          })
        }
      },
      
      JoyFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600, // SemiBold for labels
            fontSize: '1rem', // 16px
            lineHeight: 1.0,
            letterSpacing: '0%',
            marginBottom: theme.spacing(1)
          })
        }
      },
      
      // Typography component overrides for headings
      JoyTypography: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            fontFamily: '"Poppins", sans-serif',
            letterSpacing: '0%',
            lineHeight: 1.0, // 100% for all typography
            ...(ownerState.level === 'h1' && {
              fontSize: '2.25rem', // 36px - using xl4 size
              fontWeight: 600,     // SemiBold
            }),
            ...(ownerState.level === 'h2' && {
              fontSize: '2.25rem', // 36px
              fontWeight: 600,     // SemiBold
            }),
            ...(ownerState.level === 'h3' && {
              fontSize: '2rem',    // 32px
              fontWeight: 600,     // SemiBold
            }),
            ...(ownerState.level === 'h4' && {
              fontSize: '1.5rem',  // 24px
              fontWeight: 300,     // Light
            }),
            ...(ownerState.level === 'body-md' && {
              fontSize: '1rem',    // 16px
              fontWeight: 300,     // Light
            }),
            ...(ownerState.level === 'body-sm' && {
              fontSize: '0.875rem', // 14px
              fontWeight: 300,      // Light
            })
          })
        }
      }
    }
  }, customizations);

  return baseTheme;
};