import { Box, TextField, Button, Typography } from "@mui/material";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { login, isLoggedIn, role } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn()) {
      if (role === "superadmin") {
        navigate("/superadmin");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn, role, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      const { role } = useAuthStore.getState();
      
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "superadmin") {
        navigate("/superadmin");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(45deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        filter: "brightness(0.8)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", sm: 400 },
          maxWidth: 500,
          padding: 4,
          background: `rgba(0, 0, 0, 0.7)`,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          color: theme.palette.text.primary,
          boxShadow: `0 10px 30px ${theme.palette.divider}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h5" textAlign="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" textAlign="center" sx={{ marginBottom: 2, color: theme.palette.text.secondary }}>
          Please sign in to continue
        </Typography>

        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          required
          variant="outlined"
          sx={{
            input: { color: theme.palette.text.primary },
            label: { color: theme.palette.text.secondary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.divider },
              "&:hover fieldset": { borderColor: theme.palette.primary.main },
              "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          required
          variant="outlined"
          sx={{
            input: { color: theme.palette.text.primary },
            label: { color: theme.palette.text.secondary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.divider },
              "&:hover fieldset": { borderColor: theme.palette.primary.main },
              "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;