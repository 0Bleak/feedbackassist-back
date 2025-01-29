import React from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Pagination,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import useQuestionPageStore from "../stores/superAdminPageStore";
import useAuthStore from "../stores/authStore"; // Correct import for Zustand store
import axios from "axios";

const GetAllTopics: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore(); // Access token from Zustand store
  const [topics, setTopics] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` }, // Use token from Zustand store
        });
        setTopics(response.data);
      } catch (error) {
        setError("Error fetching topics.");
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTopics();
    }
  }, [accessToken]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (id: string) => {
    setCurrentPage("UpdateTopic");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/topics/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Use token from Zustand store
      });
      setTopics((prev) => prev.filter((topic) => topic._id !== id));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", minWidth: "80vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IconButton onClick={() => setCurrentPage("Picker")}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        <Typography variant="h5">Topics ({topics.length} total)</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setCurrentPage("AddTopic")}>
          Add Topic
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {topics.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((topic) => (
        <Paper key={topic._id} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography>{topic.title}</Typography>
            <Tooltip title={copiedId === topic._id ? "Copied!" : "Copy ID"}>
              <Chip label={topic._id} onClick={() => handleCopyId(topic._id)} icon={<ContentCopyIcon />} />
            </Tooltip>
          </Box>
          <Box>
            <IconButton onClick={() => handleEdit(topic._id)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDelete(topic._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Paper>
      ))}

      <Pagination count={Math.ceil(topics.length / itemsPerPage)} page={page} onChange={(_, value) => setPage(value)} />
    </Box>
  );
};

export default GetAllTopics;
