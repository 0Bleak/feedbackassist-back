import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import axios from "axios";
import useAuthStore from "../stores/authStore"; // Import your Zustand store for authentication
import useSuperAdminPageStore from "../stores/superAdminPageStore"; // Import your Zustand store for page navigation

const CreateTopic = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Access token from Zustand store
  const token = useAuthStore((state) => state.accessToken);

  // Access setCurrentPage from Zustand store for navigation
  const setCurrentPage = useSuperAdminPageStore((state) => state.setCurrentPage);

  // Handle form submission to create a topic
  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!name || !description) {
      setError("Please provide both name and description.");
      return;
    }

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      };

      const response = await axios.post(
        "http://localhost:5555/api/topics/create",
        { name, description },
        config
      );

      if (response.status === 201) {
        // Handle success response
        console.log("Topic created successfully:", response.data);
        setName("");
        setDescription("");
        setError("");
      }
    } catch (error: any) {
      // Handle error response
      console.error("Error creating topic:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleCreateTopic}>
      <Typography variant="h4" mb={2}>
        Create a New Topic
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Topic Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Create Topic
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setCurrentPage("Picker")} // Navigate back to the Picker page
          >
            Return
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateTopic;