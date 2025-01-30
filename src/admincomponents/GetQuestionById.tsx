import React from "react";
import { Button, TextField, Typography, Box, Paper, Grid, List, ListItem, ListItemText } from "@mui/material";
import useAdminPageStore from "../stores/adminPageStore";

import axios from "axios";
import useAuthStore from "../stores/authStore";

const GetQuestionById: React.FC = () => {
  const setCurrentPage = useAdminPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questionId, setQuestionId] = React.useState("");
  const [question, setQuestion] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/api/questions/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuestion(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to fetch question. Please check the ID and try again.");
      setQuestion(null); // Clear any previous question data
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'background.default', minHeight: '75vh' }}>
      <Paper sx={{ padding: 3, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
          Get Question By ID
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Question ID"
              value={questionId}
              onChange={(e) => setQuestionId(e.target.value)}
              required
              sx={{ backgroundColor: 'background.paper' }}
              InputLabelProps={{ style: { color: 'text.secondary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={fetchQuestion} fullWidth sx={{ height: '56px' }}>
              Fetch Question
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {question && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
              Question Details
            </Typography>
            <List sx={{ backgroundColor: 'background.paper', borderRadius: '8px', padding: 2 }}>
              <ListItem>
                <ListItemText primary="Label" secondary={question.label} sx={{ color: 'text.primary' }} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Options"
                  secondary={question.options.map((opt: any) => opt.value).join(", ")}
                  sx={{ color: 'text.primary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Topic ID"
                  secondary={question.topic ? question.topic.toString() : "No topic assigned"}
                  sx={{ color: 'text.primary' }}
                />
              </ListItem>
              {question.options.map((opt: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Option ${index + 1}`}
                    secondary={
                      <>
                        <Typography component="span" sx={{ display: 'block', color: 'text.primary' }}>
                          Value: {opt.value}
                        </Typography>
                        <Typography component="span" sx={{ display: 'block', color: 'text.primary' }}>
                          URL: {opt.url}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Box mt={4}>
          <Button variant="outlined" onClick={() => setCurrentPage("Picker")} fullWidth>
            Return
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GetQuestionById;