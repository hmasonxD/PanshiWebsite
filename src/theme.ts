import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F53391', // Pink color for login button
        },
        background: {
            default: '#333333', // Dark background
            paper: '#333333',
        },
    },
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
});

export default theme;