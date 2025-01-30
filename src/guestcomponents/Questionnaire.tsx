import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import useGuestPageStore from "../stores/guestStore";

interface Question {
  _id: string;
  label: string;
  options: { value: string; url?: string }[];
}

interface Topic {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

const Questionnaire: React.FC = () => {
  const { selectedTopicId, setCurrentPage } = useGuestPageStore();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Add state for user info
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (!selectedTopicId) {
      setError("No topic selected.");
      setLoading(false);
      return;
    }

    const fetchTopic = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/topics/${selectedTopicId}`);
        setTopic(response.data);
      } catch (error) {
        setError("Error fetching topic questions.");
        console.error("Error fetching topic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [selectedTopicId]);

  const handleOptionChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!topic || !userInfo.email || !userInfo.firstName || !userInfo.lastName) {
      setSnackbarMessage("Please enter your name and email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const responseData = {
        ...userInfo,
        topicId: selectedTopicId,
        responses: Object.keys(responses).map((questionId) => ({
          questionId,
          chosenOption: responses[questionId],
        })),
      };

      await axios.post("http://localhost:5555/api/responses/save", responseData);
      
      setSnackbarMessage("Responses saved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      setTimeout(() => {
        setCurrentPage("PickTopic");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Error saving responses.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error saving responses:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading questions...</Typography>
      </Box>
    );
  }

  if (error || !topic) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", pt: 4 }}>
        <Typography color="error" gutterBottom>
          {error || "Topic not found"}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setCurrentPage("PickTopic")}
          startIcon={<ArrowBackIcon />}
        >
          Back to Topics
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", minWidth: "80vw", maxWidth: "800px", margin: "0 auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => setCurrentPage("PickTopic")} sx={{ mr: 2 }}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        <Typography variant="h4">
          {topic.name}
        </Typography>
      </Box>

      {/* Add form for user info */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Email"
          fullWidth
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="First Name"
          fullWidth
          value={userInfo.firstName}
          onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={userInfo.lastName}
          onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
          sx={{ mb: 2 }}
        />
      </Box>

      {topic.questions.map((question) => (
        <Paper key={question._id} sx={{ p: 2, mb: 2, backgroundColor: "#1E1E1E" }}>
          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
            {question.label}
          </Typography>
          <RadioGroup
            value={responses[question._id] || ""}
            onChange={(e) => handleOptionChange(question._id, e.target.value)}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio sx={{ color: "#fff" }} />}
                label={
                  <Typography sx={{ color: "#fff" }}>
                    {option.value}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </Paper>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={Object.keys(responses).length !== topic.questions.length || !userInfo.email || !userInfo.firstName || !userInfo.lastName}
        >
          Submit Responses
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Questionnaire;
