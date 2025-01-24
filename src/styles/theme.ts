import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB',  
    },
    secondary: {
      main: '#FFD700',  
    },
    background: {
      default: '#a50c34', 
      paper: '#0E0E11',    
    },
    text: {
      primary: '#FFFFFF',  
      secondary: '#B0C4DE', 
    },
    divider: '#5F9EA0',    
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
          fontFamily: 'Cairo, sans-serif',
        },
      },
    },
  },
});

export default theme;
