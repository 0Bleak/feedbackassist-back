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
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import useAdminPageStore from "../stores/adminPageStore";


interface Question {
  _id: string;
  label: string;
  options: { value: string; url?: string }[];
}

interface Topic {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

const TopicDetails: React.FC = () => {
  const { accessToken } = useAuthStore();
  const [topics, setTopics] = useState<Topic[]>([]); // Store all topics for selection
  const [selectedTopicId, setSelectedTopicId] = useState<string>(""); // Store the selected topic ID
  const [topic, setTopic] = useState<Topic | null>(null); // Store the selected topic details
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching topics
  const [isFetchingDetails, setIsFetchingDetails] = useState(false); // Loading state for fetching topic details
  const [copiedId, setCopiedId] = useState<string | null>(null); // For copying question IDs
  const setCurrentPage = useAdminPageStore((state) => state.setCurrentPage);

  // Fetch all topics for selection
  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTopics(response.data);
      } catch (error) {
        setError("Failed to fetch topics. Please try again later.");
        console.error("Error fetching topics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchTopics();
    }
  }, [accessToken]);

  // Fetch details of the selected topic
  useEffect(() => {
    if (selectedTopicId) {
      const fetchTopicDetails = async () => {
        setIsFetchingDetails(true);
        try {
          const response = await axios.get(`http://localhost:5555/api/topics/${selectedTopicId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setTopic(response.data);
        } catch (error) {
          setError("Failed to fetch topic details. Please try again later.");
          console.error("Error fetching topic details:", error);
        } finally {
          setIsFetchingDetails(false);
        }
      };

      fetchTopicDetails();
    }
  }, [selectedTopicId, accessToken]);

  // Handle copying question ID
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "background.default", color: "text.primary", minHeight: "80vh", minWidth: "80vw" }}>
      <Typography variant="h4" gutterBottom>
        Topic Details
      </Typography>

      {/* Topic Selection Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={selectedTopicId}
          onChange={(e) => setSelectedTopicId(e.target.value as string)}
          label="Select Topic"
          disabled={isLoading}
        >
          {topics.map((topic) => (
            <MenuItem key={topic._id} value={topic._id}>
              {topic.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Loading Spinner while fetching details */}
      {isFetchingDetails && <CircularProgress sx={{ mb: 3 }} />}

      {/* Display Topic Details */}
      {topic && (
        <Box>
          <Typography variant="h5">{topic.name}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {topic.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Questions:
          </Typography>

          {/* Scrollable Questions Container */}
          <Box sx={{ maxHeight: "60vh", overflowY: "auto", mb: 3 }}>
            {topic.questions.length > 0 ? (
              topic.questions.map((question, idx) => (
                <Paper
                  key={question._id}
                  sx={{
                    p: 2,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    backgroundColor: "#1E1E1E",
                    "&:hover": {
                      backgroundColor: "#2D2D2D",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        bgcolor: "#333",
                        p: 0.5,
                        borderRadius: 1,
                        minWidth: 24,
                        textAlign: "center",
                      }}
                    >
                      {idx + 1}.
                    </Typography>
                    <Tooltip title={copiedId === question._id ? "Copied!" : "Copy ID"}>
                      <Chip
                        label={question._id}
                        size="small"
                        onClick={() => handleCopyId(question._id)}
                        icon={<ContentCopyIcon fontSize="small" />}
                        sx={{
                          backgroundColor: "#333",
                          color: "white",
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ pl: 4 }}>
                    <Typography sx={{ color: "#ccc" }}>{question.label}</Typography>
                  </Box>

                  <Box sx={{ pl: 4, display: "flex", gap: 1 }}>
                    {question.options.map((opt, optIdx) => (
                      <Box
                        key={optIdx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#333",
                          p: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#ccc" }}>
                          {opt.value}
                        </Typography>
                        {opt.url && (
                          <Link
                            href={opt.url}
                            target="_blank"
                            sx={{
                              ml: 0.5,
                              color: "#666",
                              "&:hover": {
                                color: "white",
                              },
                            }}
                          >
                            <LinkIcon fontSize="small" />
                          </Link>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography>No questions available</Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Display Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Return Button */}
      <Button
        variant="outlined"
        onClick={() => setCurrentPage("Picker")}
        sx={{ mt: 2 }}
      >
        Return
      </Button>
    </Box>
  );
};

export default TopicDetails;
