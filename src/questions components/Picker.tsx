import React from "react";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";
import useQuestionPageStore from "../stores/questionPageStore";

const Picker: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);

  const pages = [
    { name: "Add Question", page: "AddQuestion" },
    { name: "Get All Questions", page: "GetAllQuestions" },
    { name: "Get Question By ID", page: "GetQuestionById" },
    { name: "Update Question", page: "UpdateQuestion" },
    { name: "Delete Question", page: "DeleteQuestion" },
    { name: "Delete All Questions", page: "DeleteAllQuestions" },
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      {pages.map((p) => (
        <Grid item key={p.page} xs={12} sm={6} md={4}>
          <Card
            sx={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => setCurrentPage(p.page as any)}
          >
            <CardContent>
              <Typography variant="h6">{p.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Picker;