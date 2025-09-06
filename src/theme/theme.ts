
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  interface PalettePrimaryOverrides {
    main: true;
  }
  interface PaletteNeutralOverrides {
    50: false;
    200: false;
    300: false;
    400: false;
    500: false;
    600: false;
    700: false;
    800: false;
  }
  interface PaletteSuccessOverrides {
    100: false;
  }
}


export function createCustomTheme() {
  return extendTheme({
    "colorSchemes": {
      "light": {
        "palette": {
          "primary": {
            "main": "#002E6D"
        }
      }
    },
    "dark": {
      "palette": {
        "success": {
          "100": undefined
        },
        "neutral": {
          "50": undefined,
          "200": undefined,
          "300": undefined,
          "400": undefined,
          "500": undefined,
          "600": undefined,
          "700": undefined,
          "800": undefined
        }
      }
    }
  }
  });
}
