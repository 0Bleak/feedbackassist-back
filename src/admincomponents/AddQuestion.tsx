import React from "react";
import { Button, TextField, Grid, Typography, MenuItem } from "@mui/material";
import useAdminPageStore from "../stores/adminPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const AddQuestion: React.FC = () => {
  const setCurrentPage = useAdminPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [label, setLabel] = React.useState("");
  const [options, setOptions] = React.useState([{ value: "", url: "" }]);
  const [topicId, setTopicId] = React.useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/api/questions/add",
        { label, options, topicId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Question added:", response.data);
      setCurrentPage("Picker");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const addOption = () => {
    setOptions([...options, { value: "", url: "" }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" mb={2}>
        Add Question
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Question Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </Grid>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={`Option ${index + 1} Value`}
                value={option.value}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].value = e.target.value;
                  setOptions(newOptions);
                }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={`Option ${index + 1} URL`}
                value={option.url}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].url = e.target.value;
                  setOptions(newOptions);
                }}
                required
              />
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addOption}>
            Add Option
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Topic ID (optional)"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
            Return
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddQuestion;