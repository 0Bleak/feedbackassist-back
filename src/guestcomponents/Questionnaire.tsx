import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import useGuestPageStore from "../stores/guestStore";

const Questionnaire: React.FC = () => {
  const { topic, responses, setResponses, setCurrentPage } = useGuestPageStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!topic) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  const question = topic.questions[currentQuestionIndex];

  const handleOptionChange = (questionId: string, value: string) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length === topic.questions.length) {
      setCurrentPage("ConsentForm");
    }
  };

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {topic.name}
      </Typography>
      <Typography variant="h6" sx={{ color: "#ccc", mb: 2 }}>
        Question {currentQuestionIndex + 1} of {topic.questions.length}
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: "#1E1E1E" }}>
        <Typography variant="h6" sx={{ color: "#fff", mb: 3 }}>
          {question.label}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {question.options.map((option) => (
            <Box
              key={option.value}
              onClick={() => handleOptionChange(question._id, option.value)}
              sx={{
                p: 2,
                border: "2px solid",
                borderColor: responses[question._id] === option.value ? "#1976d2" : "#333",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: responses[question._id] === option.value ? "rgba(25, 118, 210, 0.08)" : "transparent",
                '&:hover': {
                  backgroundColor: responses[question._id] === option.value 
                    ? "rgba(25, 118, 210, 0.12)"
                    : "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography sx={{ 
                color: "#fff",
                textAlign: "center",
                fontWeight: responses[question._id] === option.value ? 600 : 400,
              }}>
                {option.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          size="large"
          sx={{ px: 3, py: 1.5 }}
        >
          Previous
        </Button>

        {currentQuestionIndex === topic.questions.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={Object.keys(responses).length !== topic.questions.length}
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!responses[question._id]}
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Questionnaire;
