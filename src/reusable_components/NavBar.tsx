import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const navigate = useNavigate();
  const { role, logout, isLoggedIn } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, [isLoggedIn, role]);

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleAdminClick = () => {
    if (role === "admin" || role === "superadmin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: 'rgba(0, 31, 63, 0.8)', // Matching your dark blue theme
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
        '&:hover': {
          boxShadow: `0px 12px 40px rgba(255, 255, 255, 0.2)`,
          transform: 'translateY(-2px)',
        }
      }}
    >
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