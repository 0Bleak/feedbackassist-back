import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AdminPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Box sx={{ zIndex: 2, position: "relative", textAlign: "center" }}>
        <Typography variant="h3">Welcome, Admin!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Manage the system with your admin privileges.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminPage;