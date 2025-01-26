import { useEffect, useRef } from 'react';
import { Box, Stack } from '@mui/material';
import useHomeStore from '../stores/homeStore';
import AdminBox from '../reusable_components/AdminBox';
import GuestBox from '../reusable_components/GuestBox';
const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initializePixels, startAnimation, stopAnimation } = useHomeStore();

  useEffect(() => {
    // Initialize pixels on mount
    initializePixels();
    // Start the animation loop
    const canvas = canvasRef.current;
    if (canvas) {
      startAnimation(canvas);
    }
    // Cleanup on unmount
    return () => {
      stopAnimation();
    };
  }, [initializePixels, startAnimation, stopAnimation]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001F3F', // Background color for the entire page
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: 'absolute', zIndex: 1 }}
      />
      
      <Stack 
          direction={{ xs: 'column', sm: 'row' }} // Column on small screens, row on larger screens
          spacing={{ xs: 2, sm: 4 }} // Adjust spacing based on screen size
          sx={{ 
            zIndex: 2, 
            position: 'relative',
            backgroundColor: 'transparent',
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
          }}
        >
        <GuestBox /> {/* Use GuestBox component */}
        <AdminBox /> {/* Use AdminBox component */}
      </Stack>
    </Box>
  );
};

export default Home;