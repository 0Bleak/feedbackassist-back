import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Pagination,
  Tooltip,
} from "@mui/material";
import useGuestPageStore from "../stores/guestStore";
import axios from "axios";

const PickTopic: React.FC = () => {
  const { setCurrentPage, setSelectedTopicId, setTopic } = useGuestPageStore();
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/api/topics");
        setTopics(response.data);
      } catch (error) {
        setError("Error fetching topics.");
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = async (topicId: string) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/topics/${topicId}`);
      setTopic(response.data);
      setSelectedTopicId(topicId);
      setCurrentPage("UserInfo");
    } catch (error) {
      console.error("Error fetching topic details:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh" }}>
        <CircularProgress sx={{ color: "#90caf9" }} />
        <Typography sx={{ mt: 2, color: "#ccc" }}>Loading topics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
        padding: 3,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}>
        Select a Topic ({topics.length} available)
      </Typography>

      <Box sx={{ width: "100%", overflowY: "auto", maxHeight: "55vh", paddingBottom: 2 }}>
        {topics.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((topic) => (
          <Paper
            key={topic._id}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: "#1E1E1E",
              borderRadius: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: "#292929",
                transform: "scale(1.02)",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                cursor: "pointer",
              },
            }}
            onClick={() => handleTopicClick(topic._id)}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 500 }}>
              {topic.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc", mt: 1 }}>
              {topic.description}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(topics.length / itemsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PickTopic;
