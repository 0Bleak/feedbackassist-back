import { Box, Typography, Button, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const GuestBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/guest'); // Redirect to the guest page
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '70%', md: '240px' },
        height: { xs: '300px', md: '300px' },
        maxWidth: '240px',
        backgroundColor: 'transparent',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        boxShadow: '0px 8px 32px rgba(255, 255, 255, 0.1)',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 12px 40px rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <PersonIcon
        sx={{
          fontSize: '4rem',
          color: theme.palette.primary.main,
          marginBottom: 2,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 700,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          marginBottom: 3,
        }}
      >
        Guest access
      </Typography>
      <Button
        variant="contained"
        onClick={handleEnterClick} // Add onClick handler
        sx={{
          width: '80%',
          padding: '12px 24px',
          marginTop: '4rem',
          fontSize: '1rem',
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.common.white,
          borderRadius: '12px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        Enter
      </Button>
    </Box>
  );
};

export default GuestBox;