import { extendTheme as extendJoyTheme } from "@mui/joy/styles";
import { createTheme as extendMuiTheme } from "@mui/material/styles";

export type CustomJoyTheme = ReturnType<typeof extendJoyTheme>;

export function createCustomJoyTheme(): CustomJoyTheme {
  return extendJoyTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            200: "#CCD5E2",
            400: "#8096B6",
            500: "#002E6D",
          },
          success: {
            200: "#CFDECF",
            400: "#87AC88",
            500: "#0E5910",
          },
          danger: {
            200: "#EED1DA",
            400: "#D58DA2",
            500: "#AC1B44",
            700: "#8F1336",
          },
          warning: {
            200: "#E7DBD0",
            400: "#C3A588",
            500: "#874D12",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            200: "#CCEEFB",
            400: "#80D4F4",
            500: "#00ACE9",
            700: "#078BB9",
          },
          success: {
            200: "#CFDECF",
            400: "#87AC88",
            500: "#0E5910",
          },
          danger: {
            200: "#EED1DA",
            400: "#D58DA2",
            500: "#AC1B44",
            700: "#8F1336",
          },
          warning: {
            200: "#E7DBD0",
            400: "#C3A588",
            500: "#874D12",
          },
        },
      },
    },
    typography: {
      h1: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        fontSize: "64px",
        lineHeight: 1,
      },
      h2: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: "36px",
        lineHeight: 1,
      },
      h3: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: "32px",
        lineHeight: 1,
      },
      h4: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        fontSize: "24px",
        lineHeight: 1,
      },
      "body-lg": {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: 1,
      },
      "body-md": {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: 1,
      },
      "body-sm": {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: 1,
      },
    },
  });
}

export function createCustomMuiTheme() {
  return extendMuiTheme({
    palette: {
      mode: "light", // can be toggled to "dark"
      primary: {
        light: "#CCD5E2", // 200
        main: "#002E6D", // 500
        dark: "#8096B6", // 400 as fallback dark
        contrastText: "#fff",
      },
      success: {
        light: "#CFDECF", // 200
        main: "#0E5910", // 500
        dark: "#87AC88", // 400
        contrastText: "#fff",
      },
      error: {
        light: "#EED1DA", // 200
        main: "#AC1B44", // 500
        dark: "#8F1336", // 700
        contrastText: "#fff",
      },
      warning: {
        light: "#E7DBD0", // 200
        main: "#874D12", // 500
        dark: "#C3A588", // 400
        contrastText: "#000",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontWeight: 500,
        fontSize: "64px",
        lineHeight: 1,
      },
      h2: {
        fontWeight: 600,
        fontSize: "36px",
        lineHeight: 1,
      },
      h3: {
        fontWeight: 600,
        fontSize: "32px",
        lineHeight: 1,
      },
      h4: {
        fontWeight: 300,
        fontSize: "24px",
        lineHeight: 1,
      },
      button: {
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: 1,
      },
      body1: {
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: 1,
      },
      body2: {
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: 1,
      },
    },
  });
}
