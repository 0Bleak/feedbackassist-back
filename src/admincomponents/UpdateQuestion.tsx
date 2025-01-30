import React from "react";
import { Button, TextField, Typography, Box, Paper, Grid, List, ListItem, IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import useAdminPageStore from "../stores/adminPageStore";

import axios from "axios";
import useAuthStore from "../stores/authStore";

const UpdateQuestion: React.FC = () => {
  const setCurrentPage = useAdminPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questionId, setQuestionId] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [options, setOptions] = React.useState([{ value: "", url: "" }]);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5555/api/questions/${questionId}`,
        { label, options },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Question updated:", response.data);
      setCurrentPage("Picker");
    } catch (error) {
      console.error("Error updating question:", error);
      setError("Failed to update question. Please check the input and try again.");
    }
  };

  const handleOptionChange = (index: number, field: string, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { value: "", url: "" }]);
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'background.default', minHeight: '75vh' ,minWidth:"80vw" }}>
      <Paper sx={{ padding: 3, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
          Update Question
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
                sx={{ backgroundColor: 'background.paper' }}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                InputProps={{ style: { color: 'text.primary' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
                Options
              </Typography>
              <List>
                {options.map((option, index) => (
                  <ListItem key={index} sx={{ padding: 0, mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label={`Option ${index + 1} Value`}
                          value={option.value}
                          onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                          required
                          sx={{ backgroundColor: 'background.paper' }}
                          InputLabelProps={{ style: { color: 'text.secondary' } }}
                          InputProps={{ style: { color: 'text.primary' } }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label={`Option ${index + 1} URL`}
                          value={option.url}
                          onChange={(e) => handleOptionChange(index, "url", e.target.value)}
                          required
                          sx={{ backgroundColor: 'background.paper' }}
                          InputLabelProps={{ style: { color: 'text.secondary' } }}
                          InputProps={{ style: { color: 'text.primary' } }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeOption(index)} sx={{ color: 'text.primary' }}>
                          <RemoveCircleOutline />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                onClick={addOption}
                startIcon={<AddCircleOutline />}
                sx={{ mt: 1, color: 'text.primary' }}
              >
                Add Option
              </Button>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Update
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setCurrentPage("Picker")}
                fullWidth
                sx={{ mt: 1 }}
              >
                Return
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateQuestion;