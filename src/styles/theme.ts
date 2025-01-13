import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B0B0B0',  // Light Gray (Primary color)
    },
    secondary: {
      main: '#8A8A8A',  // Muted Gray (Secondary color)
    },
    background: {
      default: '#121212',  // Deep Black (Primary background)
      paper: '#1e1e1e',    // Dark Charcoal (Secondary background)
    },
    text: {
      primary: '#E0E0E0',  // Light Gray (Primary text)
      secondary: '#A0A0A0', // Darker Gray (Secondary text)
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
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
  },
});

export default theme;
