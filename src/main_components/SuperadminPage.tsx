import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SuperadminPage = () => {
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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3">Welcome, Superadmin!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          You have full control over the system.
        </Typography>
      </Box>
    </Box>
  );
};

export default SuperadminPage;