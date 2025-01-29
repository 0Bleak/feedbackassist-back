import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import useQuestionPageStore from "../stores/superAdminPageStore";
import axios from "axios";
import useAuthStore from "../stores/authStore";

const AddQuestionToTopic: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);
  const { accessToken, role } = useAuthStore(); // Get access token and role
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState([{ value: "", url: "" }]);
  const [topicId, setTopicId] = useState(""); // Store the selected topicId
  const [topics, setTopics] = useState<any[]>([]); // Store available topics
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch available topics for selection
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/topics"); // Replace with your topics API endpoint
        console.log("Fetched Topics:", response.data); // Log topics to debug
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setError("Failed to fetch topics. Please try again later.");
      }
    };

    fetchTopics();
  }, []);

  // Handle form submission to add question to topic
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!accessToken) {
      setError("You are not logged in. Please log in to add questions.");
      return;
    }

    if (!label || options.some((opt) => !opt.value || !opt.url) || !topicId) {
      setError("Please provide question label, options with URLs, and select a topic.");
      return;
    }

    // Ensure topicId is a valid MongoDB ObjectId (24 character hex string)
    if (!/^[0-9a-fA-F]{24}$/.test(topicId)) {
      setError("Invalid topic ID. Please select a valid topic.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Step 1: Create the question
      const questionData = {
        label,
        options,
      };

      console.log("Creating question:", questionData);

      const createQuestionResponse = await axios.post(
        "http://localhost:5555/api/questions/add",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newQuestionId = createQuestionResponse.data.newQuestion._id;
      console.log("Question created successfully. ID:", newQuestionId);

      // Step 2: Associate the question with the topic
      const associateQuestionData = {
        topicId,
        questionId: newQuestionId,
      };

      console.log("Associating question with topic:", associateQuestionData);

      const associateResponse = await axios.post(
        "http://localhost:5555/api/topics/add-question",
        associateQuestionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Question added to topic:", associateResponse.data);
      setCurrentPage("Picker"); // Navigate back to Picker page after success
    } catch (error: any) {
      console.error("Error:", error.response || error);
      setError(error.response?.data?.message || "An error occurred while adding the question.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Add a new option field
  const addOption = () => {
    setOptions([...options, { value: "", url: "" }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" mb={2}>
        Add Question to Topic
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {/* Question Label */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Question Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </Grid>
        {/* Topic Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Topic</InputLabel>
            <Select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              label="Topic"
            >
              {topics.map((topic) => (
                <MenuItem key={topic._id} value={topic._id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Options */}
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
        {/* Add Option Button */}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addOption}>
            Add Option
          </Button>
        </Grid>
        {/* Submit and Return Buttons */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Submit Question to Topic"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setCurrentPage("Picker")}>
            Return to Picker
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddQuestionToTopic;