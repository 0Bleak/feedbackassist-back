import React, { useState, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from "@mui/material";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import useSuperAdminPageStore from "../stores/superAdminPageStore";

interface Topic {
  _id: string;
  name: string;
  description: string;
}

const EditTopic: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTopics, setIsFetchingTopics] = useState(false);

  const token = useAuthStore((state) => state.accessToken);
  const setCurrentPage = useSuperAdminPageStore((state) => state.setCurrentPage);

  // Fetch all topics for selection
  useEffect(() => {
    const fetchTopics = async () => {
      setIsFetchingTopics(true);
      try {
        const response = await axios.get("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopics(response.data);
      } catch (error) {
        setMessage("Error fetching topics");
        console.error("Error fetching topics:", error);
      } finally {
        setIsFetchingTopics(false);
      }
    };

    if (token) {
      fetchTopics();
    }
  }, [token]);

  // Fetch selected topic details
  useEffect(() => {
    if (selectedTopicId) {
      const fetchTopicDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5555/api/topics/${selectedTopicId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setName(response.data.name);
          setDescription(response.data.description);
        } catch (error) {
          setMessage("Error fetching topic details");
          console.error("Error fetching topic details:", error);
        }
      };

      fetchTopicDetails();
    }
  }, [selectedTopicId, token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }
    if (!selectedTopicId) {
      setMessage("Please select a topic.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5555/api/topics/${selectedTopicId}`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Topic updated successfully");
      
      // Update the topics list with the updated topic
      setTopics(prevTopics => 
        prevTopics.map(topic => 
          topic._id === selectedTopicId 
            ? { ...topic, name, description } 
            : topic
        )
      );
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error updating topic");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", minHeight: "80vh", minWidth: "80vw" }}>
      <Typography variant="h4" gutterBottom>
        Edit Topic
      </Typography>

      {isFetchingTopics ? (
        <CircularProgress />
      ) : (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Topic</InputLabel>
          <Select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            label="Select Topic"
          >
            {topics.map((topic) => (
              <MenuItem key={topic._id} value={topic._id}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedTopicId && (
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
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !name || !description}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Update Topic"}
          </Button>
        </form>
      )}

      {message && (
        <Typography 
          color={message.includes("Error") ? "error" : "success"} 
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}

      <Button
        variant="outlined"
        fullWidth
        onClick={() => setCurrentPage("Picker")}
        sx={{ mt: 2 }}
      >
        Return
      </Button>
    </Box>
  );
};

export default EditTopic;