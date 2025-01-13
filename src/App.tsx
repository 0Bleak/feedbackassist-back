import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import RoutesComponent from './routing/RoutesComponent';
import theme from './styles/theme';  

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutesComponent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
