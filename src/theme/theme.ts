import { extendTheme, Theme } from "@mui/joy/styles";

export interface CustomTheme extends Theme {
  // Add any custom theme properties here
}

export const createCustomTheme = (customizations?: any): CustomTheme => {
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
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
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
            500: "#60a5fa",
            600: "#93c5fd",
            700: "#bfdbfe",
            800: "#dbeafe",
            900: "#eff6ff",
          },
          neutral: {
            50: "#111827",
            100: "#1f2937",
            200: "#374151",
            300: "#4b5563",
            400: "#6b7280",
            500: "#9ca3af",
            600: "#d1d5db",
            700: "#e5e7eb",
            800: "#f3f4f6",
            900: "#f9fafb",
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
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
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
