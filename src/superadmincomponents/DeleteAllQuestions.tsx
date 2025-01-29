import React from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import useQuestionPageStore from "../stores/superAdminPageStore";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Delete All Questions
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAll}
          sx={{ fontWeight: "bold" }}
        >
          Delete All
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

export default DeleteAllQuestions;