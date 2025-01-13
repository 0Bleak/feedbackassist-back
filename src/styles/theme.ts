import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A9E0',  // Electric Blue (Primary color)
    },
    secondary: {
      main: '#39FF14',  // Neon Green (Secondary color)
    },
    background: {
      default: '#1e1e1e',  // Dark Charcoal (Primary background)
      paper: '#121212',    // Deep Black (Secondary background)
    },
    text: {
      primary: '#E0E0E0',  // Light Gray (Primary text)
      secondary: '#B0B0B0', // Slate Gray (Secondary text)
    },
    divider: '#3A3A3A',    // Dim Gray (Dividers)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
  },
});

export default theme;
