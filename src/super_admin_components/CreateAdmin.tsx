import { Box, TextField, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useFormStore from "../stores/formStore"; // Import the form store
import useAuthStore from "../stores/authStore"; // Import the auth store
import { useState } from "react"; // Import useState for local state management

const CreateAdmin = () => {
  const theme = useTheme();
  const [message, setMessage] = useState(""); // Local state for messages
  const [role, setRole] = useState("admin"); // Local state for role

  // Zustand stores
  const { email, password, setEmail, setPassword } = useFormStore();
  const { accessToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5555/api/auth/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Admin created successfully!");
        setEmail(""); // Reset email in Zustand store
        setPassword(""); // Reset password in Zustand store
        setRole("admin"); // Reset role locally
      } else {
        setMessage(data.message || "Failed to create admin");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 2,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create New Admin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Role"
          select
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          SelectProps={{
            native: true,
          }}
          required
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Admin
        </Button>
      </form>
      {message && (
        <Typography
          variant="body2"
          sx={{ mt: 2, color: message.includes("success") ? "green" : "red" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CreateAdmin;