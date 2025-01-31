import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import RoutesComponent from './routing/RoutesComponent';
import Navbar from './reusable_components/NavBar';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative'
        }}>
          <Box sx={{ 
            position: 'fixed',
            top: '5px',
            left: '100%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'auto'
          }}>
            <Navbar />
          </Box>
          <Box sx={{ flexGrow: 1, pt: '80px' }}>
            <RoutesComponent />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
