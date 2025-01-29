import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useFormStore from "../stores/formStore";
import useAuthStore from "../stores/authStore";
import superAdminPageStore from "../stores/superAdminPageStore";
const CreateAdmin: React.FC = () => {
  const theme = useTheme();
  const setCurrentPage = superAdminPageStore((state) => state.setCurrentPage); // Access Zustand store for navigation
  const { email, password, setEmail, setPassword } = useFormStore();
  const { accessToken } = useAuthStore();

  const [message, setMessage] = useState("");
  const [role, setRole] = useState("admin");

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
        gap: 3,
        padding: 3,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create New Admin
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
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
          sx={{ mt: 2, fontWeight: "bold" }}
          fullWidth
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
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage("Picker")}
          sx={{ fontWeight: "bold" }}
        >
          Return
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateAdmin;
