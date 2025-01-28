import React from "react";
import { Button, Typography } from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const DeleteAllQuestions: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5555/api/questions", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("All questions deleted");
      setCurrentPage("Picker");
    } catch (error) {
      console.error("Error deleting all questions:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Delete All Questions</Typography>
      <Button variant="contained" onClick={handleDeleteAll}>
        Delete All
      </Button>
      <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
        Return
      </Button>
    </div>
  );
};

export default DeleteAllQuestions;