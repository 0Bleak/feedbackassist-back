import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',  // Dark gray (for buttons and borders)
    },
    secondary: {
      main: '#555555',  // Slightly lighter gray (for subtle elements)
    },
    background: {
      default: '#000000',  // Black (whole page background)
      paper: '#111111',    // Dark gray (for paper elements like forms)
    },
    text: {
      primary: '#FFFFFF',  // White (for text to stand out against dark background)
      secondary: '#B0B0B0', // Soft light gray (for secondary text)
    },
    divider: '#444444',    // Darker gray for dividers
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Smooth corners for buttons
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo, sans-serif', // Retained for aesthetics
        },
      },
    },
  },
});

export default theme;
