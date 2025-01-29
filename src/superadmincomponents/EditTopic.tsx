import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import useAuthStore from "../stores/authStore"; // Correct import for your Zustand store

interface EditTopicProps {
  topicId: string;
}

const EditTopic: React.FC<EditTopicProps> = ({ topicId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Access token from Zustand store
  const token = useAuthStore((state) => state.accessToken); // Get token from Zustand store

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/topics/${topicId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Use token from Zustand
        });
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        setMessage("Error fetching topic");
      }
    };

    if (topicId) {
      fetchTopic();
    }
  }, [topicId, token]); // Add token to dependencies for re-fetching if it changes

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `/api/topics/${topicId}`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } } // Use token from Zustand
      );
      setMessage("Topic updated successfully");
    } catch (error) {
      setMessage("Error updating topic");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>Edit Topic</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Updating..." : "Update Topic"}
        </Button>
      </form>
      {message && (
        <Typography 
          color={message.includes("Error") ? "error" : "success"} 
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default EditTopic;
