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
} from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const GetAllQuestions: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const itemsPerPage = 6; // Number of questions per page

  // Fetch questions when component mounts
  React.useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Start loading when request is sent
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
        setLoading(false); // Stop loading when request is completed
      }
    };

    fetchQuestions();
  }, [accessToken]);

  // Pagination logic
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedQuestions = questions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        All Questions
      </Typography>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {paginatedQuestions.map((question) => (
          <Grid item xs={12} sm={6} md={4} key={question._id}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
                overflow: "hidden", // Prevent any overflow outside the container
                width: "100%", // Ensure full width for the Paper container
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  whiteSpace: "nowrap", // Prevent text wrapping to a new line
                  overflow: "hidden", // Hide anything that overflows the container
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                  display: "inline-block", // Let the text take its natural width
                  maxWidth: "100%", // Allow container to expand with text
                  width: "auto", // Make sure it auto sizes to fit the text
                }}
              >
                Question ID: {question._id}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: "text.secondary", wordBreak: "break-word" }}>
                {question.label}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2, fontWeight: "bold", color: "text.primary" }}>
                Options:
              </Typography>
              <Box sx={{ marginTop: 1 }}>
                {question.options.map((opt: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                      padding: 1,
                      backgroundColor: "background.paper",
                      borderRadius: 1,
                      width: "100%", // Ensure full width for the option box
                    }}
                  >
                    <Typography variant="body2" sx={{ flexGrow: 1, color: "text.secondary" }}>
                      {opt.value}
                    </Typography>
                    {opt.url && (
                      <Link
                        href={opt.url}
                        target="_blank"
                        rel="noopener"
                        sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                      >
                        (Link)
                      </Link>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={Math.ceil(questions.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ "& .MuiPaginationItem-root": { fontSize: "1rem" } }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage("Picker")}
          sx={{
            padding: "8px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          Return
        </Button>
      </Box>
    </Box>
  );
};

export default GetAllQuestions;
