import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const DeleteQuestion: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questionId, setQuestionId] = React.useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Question deleted");
      setCurrentPage("Picker");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Delete Question</Typography>
      <TextField
        fullWidth
        label="Question ID"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        required
      />
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
        Return
      </Button>
    </div>
  );
};

export default DeleteQuestion;