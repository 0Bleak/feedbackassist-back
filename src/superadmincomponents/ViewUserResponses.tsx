import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import useAuthStore from "../stores/authStore";
import useSuperAdminPageStore from "../stores/superAdminPageStore";  // useSuperAdminPageStore

interface Response {
  question: { _id: string; label: string };
  chosenOption: string;
  associatedUrl: string;
}

interface UserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  topic: { _id: string; name: string };
  responses: Response[];
  createdAt: string;
}

interface Topic {
  _id: string;
  name: string;
}

const ViewUserResponses: React.FC = () => {
  const { accessToken } = useAuthStore();
  const { setCurrentPage } = useSuperAdminPageStore(); // use setCurrentPage from superAdminPageStore
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [accessToken]);

  const fetchResponses = useCallback(async () => {
    if (!selectedTopicId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5555/api/responses?page=${page}&limit=${pageSize}&topicId=${selectedTopicId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data.length < pageSize) setHasMore(false);
      setResponses((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTopicId, page, accessToken]);

  useEffect(() => {
    setResponses([]);
    setPage(1);
    setHasMore(true);
    if (selectedTopicId) fetchResponses();
  }, [selectedTopicId, fetchResponses]);

  useEffect(() => {
    setFilteredResponses(
      responses.filter((r) =>
        r.email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    );
  }, [searchEmail, responses]);

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handleReturn = () => {
    setCurrentPage("Picker"); // Return to Picker screen
  };

  return (
    <Box sx={{ p: 3, minHeight: "80vh", minWidth: "80vw" }}>
      <Typography variant="h4" gutterBottom>
        View User Responses
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={selectedTopicId}
          onChange={(e) => setSelectedTopicId(e.target.value as string)}
        >
          {topics.map((topic) => (
            <MenuItem key={topic._id} value={topic._id}>
              {topic.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Search by Email"
        variant="outlined"
        sx={{ mb: 3 }}
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
      />

      <Box sx={{ maxHeight: "60vh", overflowY: "auto", p: 1 }}>
        {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />}

        {filteredResponses.length > 0 ? (
          filteredResponses.map((userResponse) => (
            <Paper key={userResponse._id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">
                {userResponse.firstName} {userResponse.lastName} ({userResponse.email})
              </Typography>
              {userResponse.responses.map((response) => (
                <Box key={response.question._id} sx={{ mt: 1 }}>
                  <Typography>{response.question.label}</Typography>
                  <Chip label={response.chosenOption} color="primary" />
                </Box>
              ))}
            </Paper>
          ))
        ) : (
          !loading && <Typography>No responses found for this topic.</Typography>
        )}
      </Box>

      {hasMore && (
        <Button
          onClick={loadMore}
          disabled={loading}
          variant="contained"
          sx={{ mt: 2, display: "block", mx: "auto" }}
        >
          Load More
        </Button>
      )}

      {/* Return button */}
      <Button
        onClick={handleReturn}
        variant="outlined"
        sx={{ mt: 2, display: "block", mx: "auto", color: "primary" }}
      >
        Return
      </Button>
    </Box>
  );
};

export default ViewUserResponses;
