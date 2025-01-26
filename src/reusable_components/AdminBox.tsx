import { Box, Typography, Button, useTheme } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const AdminBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
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
      <AdminPanelSettingsIcon
        sx={{
          fontSize: '4rem',
          color: theme.palette.secondary.main,
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
        Admin access
      </Typography>
      <Button
        variant="contained"
        onClick={handleLoginClick} // Add onClick handler
        sx={{
          width: '80%',
          marginTop: '4rem',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          color: theme.palette.common.white,
          borderRadius: '12px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default AdminBox;