import { extendTheme, type Theme } from '@mui/joy/styles';


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
}

export function createCustomTheme(
  customization: Partial<Theme> = {}
): Theme {
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
    ...customization,
  });
}
