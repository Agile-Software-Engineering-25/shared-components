import { CssVarsThemeOptions, extendTheme, Theme } from "@mui/joy/styles";

export interface CustomTheme extends Theme {
  // Add any custom theme properties here
}

export const createCustomTheme = (
  customizations?: CssVarsThemeOptions | undefined
): CustomTheme => {
  return extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
          neutral: {
            50: "#bb3a29ff",
            100: "#974338ff",
            200: "#8a3e34ff",
            300: "#52201aff",
            400: "#331410ff",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            50: "#1e3a8a",
            100: "#1e40af",
            200: "#1d4ed8",
            300: "#2563eb",
            400: "#3b82f6",
          },
          neutral: {
            50: "#111827",
            100: "#1f2937",
            200: "#374151",
            300: "#4b5563",
            400: "#6b7280",
          },
        },
      },
    },
    fontFamily: {
      body: '"Inter", "Helvetica", "Arial", sans-serif',
      display: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    typography: {
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
    },
    components: {
      JoyButton: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
            fontWeight: 500,
            textTransform: "none",
          },
        },
      },
      JoyCard: {
        styleOverrides: {
          root: {
            borderRadius: "0.75rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          },
        },
      },
      JoyInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
    },
    ...customizations,
  });
};
