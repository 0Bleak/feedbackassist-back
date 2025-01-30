import React from "react";
import { Button, TextField, Typography, Box, Stack } from "@mui/material";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import useAdminPageStore from "../stores/adminPageStore";

const DeleteQuestion: React.FC = () => {
  const setCurrentPage = useAdminPageStore((state) => state.setCurrentPage);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 3,
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Delete Question
      </Typography>
      <TextField
        fullWidth
        label="Question ID"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        required
        sx={{ maxWidth: 400 }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ fontWeight: "bold" }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage("Picker")}
          sx={{ fontWeight: "bold" }}
        >
          Return
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteQuestion;