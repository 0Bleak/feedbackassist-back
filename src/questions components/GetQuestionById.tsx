import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const GetQuestionById: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken } = useAuthStore();
  const [questionId, setQuestionId] = React.useState("");
  const [question, setQuestion] = React.useState<any>(null);

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
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Get Question By ID</Typography>
      <TextField
        fullWidth
        label="Question ID"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        required
      />
      <Button variant="contained" onClick={fetchQuestion}>
        Fetch Question
      </Button>
      {question && (
        <Box mt={2}>
          <Typography variant="h6">{question.label}</Typography>
          <Typography>
            Options:{" "}
            {question.options.map((opt: any) => opt.value).join(", ")}
          </Typography>
        </Box>
      )}
      <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
        Return
      </Button>
    </div>
  );
};

export default GetQuestionById;