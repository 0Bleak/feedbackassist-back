import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  const theme = useTheme(); 

  const generateInitialPixels = () => {
    const pixels = [];
    const numPixels = 15; 

    for (let i = 0; i < numPixels; i++) {
      pixels.push({
        id: i,
        top: Math.random() * 100, 
        left: Math.random() * 100, 
        speedX: (Math.random() - 0.5) * 0.5, 
        speedY: (Math.random() - 0.5) * 0.5, 
      });
    }

    return pixels;
  };

  const [pixels, setPixels] = useState(generateInitialPixels());

  useEffect(() => {
    const movePixels = () => {
      setPixels((prevPixels) =>
        prevPixels.map((pixel) => {
          let newTop = pixel.top + pixel.speedY;
          let newLeft = pixel.left + pixel.speedX;

  
          if (newTop > 100) newTop = 0;
          if (newTop < 0) newTop = 100;
          if (newLeft > 100) newLeft = 0;
          if (newLeft < 0) newLeft = 100;

          return {
            ...pixel,
            top: newTop,
            left: newLeft,
          };
        })
      );
    };

    const intervalId = setInterval(movePixels, 30); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',  
        width: '100vw',  
        background: `linear-gradient(45deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,        
        padding: 0,        
        overflow: 'hidden', 
        position: 'absolute', 
        top: 0,           
        left: 0,           
      }}
    >
      {pixels.map((pixel) => (
        <Box
          key={pixel.id}
          sx={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            backgroundColor: '#FFFFFF', 
            boxShadow: '0 0 5px #FFFFFF',
            top: `${pixel.top}%`,
            left: `${pixel.left}%`,
          }}
        />
      ))}
    </Box>
  );
};

export default Home;
