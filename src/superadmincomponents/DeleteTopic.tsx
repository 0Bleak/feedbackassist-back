import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent 
} from "@mui/material";
import useSuperAdminPageStore from "../stores/superAdminPageStore";

interface Topic {
  _id: string;
  name: string;
}

const DeleteTopic: React.FC = () => {
  const { accessToken } = useAuthStore();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const setCurrentPage = useSuperAdminPageStore((state) => state.setCurrentPage);

  useEffect(() => {
    if (accessToken) {
      axios
        .get<Topic[]>("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setTopics(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch topics");
          setLoading(false);
        });
    } else {
      setError("Unauthorized: No access token");
      setLoading(false);
    }
  }, [accessToken]);

  const handleTopicChange = (event: SelectChangeEvent) => {
    setSelectedTopicId(event.target.value);
  };

  const handleDelete = async () => {
    if (!selectedTopicId) {
      alert("Please select a topic to delete");
      return;
    }

    const topicIdToDelete = selectedTopicId; // Store the ID
    console.log(selectedTopicId)

    try {
      const response = await axios.delete(`http://localhost:5555/api/topics/${topicIdToDelete}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { id: topicIdToDelete } // Send ID in request body
      });

      if (response.status === 200) {
        setTopics(prevTopics => prevTopics.filter(topic => topic._id !== topicIdToDelete));
        setSelectedTopicId("");
        alert("Topic deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete topic");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ 
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      maxWidth: 400,
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom>
        Delete Topic
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="topic-select-label">Select Topic</InputLabel>
        <Select
          labelId="topic-select-label"
          value={selectedTopicId}
          label="Select Topic"
          onChange={handleTopicChange}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiSelect-icon': {
              color: 'white',
            },
          }}
        >
          {topics.map((topic) => (
            <MenuItem key={topic._id} value={topic._id}>
              {topic.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={!selectedTopicId}
          sx={{
            width: '120px',
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
            },
          }}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          onClick={() => setCurrentPage("Picker")}
          sx={{
            width: '120px',
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteTopic;