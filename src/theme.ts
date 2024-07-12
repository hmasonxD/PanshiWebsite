import { createTheme } from '@mui/material/styles';

// Define the structure of our custom theme properties
declare module '@mui/material/styles' {
    interface Theme {
        customPalette: {
            navbarBackground: string;
        }
    }
    interface ThemeOptions {
        customPalette?: {
            navbarBackground?: string;
        }
    }
}

const baseTheme = {
    typography: {
        fontFamily: 'Acme, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Acme';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/acme/v18/RrQfboBx-C5_XxrBbg.woff2) format('woff2');
        }
      `,
        },
    },
};

const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#F53391', // Pink color for login button
        },
        background: {
            default: '#3B0256',
            paper: '#333333',
        },
    },
    customPalette: {
        navbarBackground: '#333333',
    },
});

const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#F53391', // Pink color for login button
        },
        background: {
            default: '#F3EFF4',
            paper: '#F3EFF4',
        },
        text: {
            primary: '#000000',
        },
    },
    customPalette: {
        navbarBackground: '#F9E4A0',
    },
});

export { darkTheme, lightTheme };