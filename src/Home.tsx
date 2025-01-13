import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  const theme = useTheme(); // Access the theme

  return (
    <Box
      sx={{
        height: '100vh',  // Full viewport height
        width: '100vw',   // Full viewport width
        background: `linear-gradient(45deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`, // Dark gradient using background colors
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,         // Remove default margin
        padding: 0,        // Remove default padding
        overflow: 'hidden', // Ensure no overflow
        position: 'absolute', // Ensure it stretches across the whole screen
        top: 0,            // Position at the top of the viewport
        left: 0,           // Position at the left of the viewport
      }}
    >
      {/* to do later */}
    </Box>
  );
};

export default Home;
