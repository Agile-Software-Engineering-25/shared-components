import { extendTheme } from "@mui/joy/styles";
import type { CssVarsThemeOptions } from "@mui/joy/styles";

/**
 * Create the Joy UI theme with default palette.
 * Caller can override any part by passing an extension object.
 */
export function createCustomTheme(overrides?: CssVarsThemeOptions) {
  return extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            900: "#002E6D", // Primary 100%
            500: "#8096B6", // Primary 50%
            200: "#CCD5E2", // Primary 20%
          },
          success: {
            900: "#0E5910", // Success 100%
            500: "#87AC88", // Success 50%
            200: "#CFDECF", // Success 20%
          },
          danger: {
            darkChannel: "#8F1336", // Danger Dark
            900: "#AC1B44", // Danger 100%
            500: "#D58DA2", // Danger 50%
            200: "#EED1DA", // Danger 20%
          },
          warning: {
            900: "#874D12", // Warning 100%
            500: "#C3A588", // Warning 50%
            200: "#E7DBD0", // Warning 20%
          },
          neutral: {
            darkChannel: "#1A1A1A", // Night
            900: "#00122B", // Grey 100%
            800: "#314055", // Grey 80%
            500: "#798595", // Grey 50%
            200: "#C2CAD5", // Grey 20%
            100: "#F3F8FF", // Grey 0%
            50: "#FFFFFF",  // White
          },
          text: {
            primary: "#00122B",   // Text/Light/Primary
            secondary: "#314055", // Text/Light/Secondary
            tertiary: "#798595",  // Text/Light/Disabled
          },
          background: {
            body: "#FFFFFF",   // Background/Light/Primary
            surface: "#F3F8FF" // Background/Light/Secondary
          },
        },
      },
    },
    ...overrides, // allow caller to override
  });
}
