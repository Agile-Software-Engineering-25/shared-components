import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  interface PalettePrimaryOverrides {
    20: true;
    200: false;
    300: false;
    400: false;
    500: false;
    600: false;
    700: false;
    800: false;
    900: false;
    dark: true;
  }
  interface PaletteDangerOverrides {
    20: true;
    200: false;
    300: false;
    400: false;
    500: false;
    600: false;
    700: false;
    800: false;
    900: false;
    dark: true;
  }
  interface PaletteSuccessOverrides {
    20: true;
    200: false;
    300: false;
    400: false;
    500: false;
    600: false;
    700: false;
    800: false;
    900: false;
  }
  interface PaletteWarningOverrides {
    20: true;
    200: false;
    300: false;
    400: false;
    500: false;
    600: false;
    700: false;
    800: false;
    900: false;
  }
  interface TypographySystemOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    body: true;
    button_large: true;
    button_medium: true;
    button_small: true;
  }
}

export type CustomTheme = ReturnType<typeof extendTheme>;

export function createCustomTheme(
  customization: Partial<CustomTheme > = {}
): CustomTheme  {
  return extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            "20": "#CCD5E2",
            "50": "#8096B6",
            "100": "#002E6D",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
          },
          success: {
            "20": "#CFDECF",
            "50": "#87AC88",
            "100": "#0E5910",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
          },
          danger: {
            "20": "#EED1DA",
            "50": "#D58DA2",
            "100": "#AC1B44",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
            dark: "#8F1336",
          },
          warning: {
            "20": "#E7DBD0",
            "50": "#C3A588",
            "100": "#874D12",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
          },
        },
      },
      dark: {
        palette: {
          warning: {
            "20": "#E7DBD0",
            "50": "#C3A588",
            "100": "#874D12",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
          },
          success: {
            "20": "#CFDECF",
            "50": "#87AC88",
            "100": "#0E5910",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
          },
          danger: {
            "20": "#EED1DA",
            "50": "#D58DA2",
            "100": "#AC1B44",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
            dark: "#8F1336",
          },
          primary: {
            "20": "#CCEEFB",
            "50": "#80D4F4",
            "100": "#00ACE9",
            "200": undefined,
            "300": undefined,
            "400": undefined,
            "500": undefined,
            "600": undefined,
            "700": undefined,
            "800": undefined,
            "900": undefined,
            dark: "#078BB9",
          },
        },
      },
    },
    typography: {
      h1: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,           // Medium
        fontStyle: 'normal',
        fontSize: '64px',
        lineHeight: 1,
        letterSpacing: 0,
      },
      h2: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,           // SemiBold
        fontStyle: 'normal',
        fontSize: '36px',
        lineHeight: 1,
        letterSpacing: 0,
      },
      h3: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,           // SemiBold
        fontStyle: 'normal',
        fontSize: '32px',
        lineHeight: 1,
        letterSpacing: 0,
      },
      h4: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,           // Light
        fontStyle: 'normal',
        fontSize: '24px',
        lineHeight: 1,
        letterSpacing: 0,
      },
      body: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,           // Light
        fontStyle: 'normal',
        fontSize: '16px',
        lineHeight: 1,
        letterSpacing: 0,
      },
      button_large: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,           // SemiBold
        fontStyle: 'normal',
        fontSize: '16px',
        lineHeight: 1,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      button_medium: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,           // SemiBold
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: 1,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
      button_small: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,           // SemiBold
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: 1,
        letterSpacing: 0,
        textTransform: 'uppercase',
      },
    },
    ...customization,
  });
}
