import React from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  IconButton,
  Pagination,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ContentCopy as ContentCopyIcon
} from "@mui/icons-material";
import useQuestionPageStore from "../stores/superAdminPageStore";
import axios from "axios";

const GetAllTopics: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
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
        console.log("Fetching topics...");
        const response = await axios.get("http://localhost:5555/api/topics");
        console.log("Topics fetched:", response.data);
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

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", minWidth: "80vw" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <IconButton onClick={() => setCurrentPage("Picker")}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        <Typography variant="h5">Topics ({topics.length} total)</Typography>
      </Box>

      {topics
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((topic) => (
          <Paper
            key={topic._id}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#1E1E1E",
              "&:hover": {
                backgroundColor: "#2D2D2D",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="h6" sx={{ color: "#fff" }}>{topic.name}</Typography>
              <Tooltip title={copiedId === topic._id ? "Copied!" : "Copy ID"}>
                <Chip
                  label={topic._id}
                  onClick={() => handleCopyId(topic._id)}
                  icon={<ContentCopyIcon />}
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
            <Typography variant="body2" sx={{ color: "#ccc", mt: 1 }}>
              {topic.description}
            </Typography>
          </Paper>
        ))}

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

export default GetAllTopics;
