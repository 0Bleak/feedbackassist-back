import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const DeleteTopic: React.FC = () => {
  const [topicId, setTopicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = useAuthStore((state) => state.accessToken);

  const handleDelete = async () => {
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }

    if (!topicId.trim()) {
      setMessage("Please enter a valid topic ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5555/api/topics/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 204) {
        setMessage("Topic deleted successfully");
        setTopicId(""); // Clear input field after success
      } else {
        setMessage("Failed to delete topic. Please try again.");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error deleting topic");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>Delete Topic</Typography>
      <TextField
        label="Enter Topic ID"
        variant="outlined"
        fullWidth
        value={topicId}
        onChange={(e) => setTopicId(e.target.value)}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button 
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={!topicId.trim()} // Disable button if input is empty
        >
          Delete Topic
        </Button>
      )}
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

export default DeleteTopic;
