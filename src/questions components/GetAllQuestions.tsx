import React from "react";
import {
  Button,
  Typography,
  Grid,
  CircularProgress,
  Pagination,
  Paper,
  Box,
  Link,
  Chip,
  IconButton,
  Tooltip,
  ThemeProvider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useQuestionPageStore from "../stores/questionPageStore";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import theme from "../styles/theme";

const GetAllQuestions: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const itemsPerPage = 5; // Updated limit to 5 items per page

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/api/questions", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        setError("Error fetching questions.");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [accessToken]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, backgroundColor: "background.default", color: "text.primary", minHeight: "80vh",minWidth:"80vw" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 1000,
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
              <IconButton onClick={() => setCurrentPage("Picker")}>
                <ArrowBackIcon color="primary" />
              </IconButton>
              <Typography variant="h5" sx={{ marginLeft: 2 }}>
                Questions ({questions.length} total)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Page {page} of {totalPages}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Paper sx={{ p: 2, mb: 2, bgcolor: "background.paper" }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        <Box sx={{ mb: 4 }}>
          {paginatedQuestions.map((question, idx) => (
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
                  {startIndex + idx + 1}.
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
                {question.options.map((opt: any, optIdx: number) => (
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
          ))}
        </Box>

        {totalPages > 1 && (
          <Box
            sx={{
              position: "sticky",
              bottom: 20,
              display: "flex",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <Paper
              sx={{
                p: 1,
                boxShadow: 3,
                bgcolor: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(5px)",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Paper>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default GetAllQuestions;
