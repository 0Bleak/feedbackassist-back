import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const UpdateQuestion: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questionId, setQuestionId] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [options, setOptions] = React.useState([{ value: "", url: "" }]);

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
    }
  };

  return (
    <div>
      <Typography variant="h4">Update Question</Typography>
      <TextField
        fullWidth
        label="Question ID"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="New Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Update
      </Button>
      <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
        Return
      </Button>
    </div>
  );
};

export default UpdateQuestion;