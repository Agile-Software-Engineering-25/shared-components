import { extendTheme } from '@mui/joy/styles';

export type CustomTheme = ReturnType<typeof extendTheme>;

export function createCustomTheme(
  customization: Partial<CustomTheme> = {}
): CustomTheme {
  return extendTheme({
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
        fontSize: '64px',
        lineHeight: 1,
      },
      h2: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '36px',
        lineHeight: 1,
      },
      h3: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: 1,
      },
      h4: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        fontSize: '24px',
        lineHeight: 1,
      },
      'body-lg': {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: 1,
        textTransform: 'uppercase',
      },
      'body-md': {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: 1,
        textTransform: 'uppercase',
      },
      'body-sm': {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: 1,
        textTransform: 'uppercase',
      },
    },
    ...customization,
  });
}
