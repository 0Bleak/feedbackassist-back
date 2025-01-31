import { Box, Button, IconButton, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const navigate = useNavigate();
  const { role, logout, isLoggedIn } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, [isLoggedIn, role]);

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleAdminClick = () => {
    if (role === "admin" || role === "superadmin") {
      navigate(role === "superadmin" ? "/superadmin" : "/admin");
    } else {
      navigate("/home");
    }
  };

  const handleLoginClick = () => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/home");
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      {!isExpanded ? (
        <IconButton
          onClick={toggleNavbar}
          sx={{
            backgroundColor: 'rgba(0, 31, 63, 0.8)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 31, 63, 0.9)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
      ) : (
        <Box
          sx={{
            display: "flex",
            backgroundColor: 'rgba(0, 31, 63, 0.8)',
            padding: "8px 16px",
            width: "auto",
            minWidth: "250px",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: "10px",
            boxShadow: `0px 8px 32px rgba(255, 255, 255, 0.1)`,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            animation: "slideIn 0.3s ease-out",
            '@keyframes slideIn': {
              from: {
                opacity: 0,
                transform: 'translateX(50px)',
              },
              to: {
                opacity: 1,
                transform: 'translateX(0)',
              },
            },
            '&:hover': {
              boxShadow: `0px 12px 40px rgba(255, 255, 255, 0.2)`,
            }
          }}
        >
          <IconButton
            onClick={toggleNavbar}
            sx={{
              color: 'white',
              mr: 1,
              '&:hover': {
                transform: 'rotate(180deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button sx={buttonStyles(theme)} onClick={handleHomeClick}>
            Home
          </Button>
          {(role === "admin" || role === "superadmin") && (
            <Button sx={buttonStyles(theme)} onClick={handleAdminClick}>
              Admin
            </Button>
          )}
          {!isAuthenticated && (
            <Button sx={buttonStyles(theme)} onClick={handleLoginClick}>
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button sx={buttonStyles(theme)} onClick={handleLogoutClick}>
              Logout
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

const buttonStyles = (theme: any) => ({
  color: theme.palette.common.white,
  textTransform: "none",
  padding: "6px 16px",
  borderRadius: "8px",
  fontSize: "0.9rem",
  fontWeight: 500,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  opacity: 0.9,
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-1px)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
  }
});

export default Navbar;