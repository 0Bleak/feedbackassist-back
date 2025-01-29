import React from "react";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";
import useQuestionPageStore from "../stores/superAdminPageStore";

const Picker: React.FC = () => {
  const setCurrentPage = useQuestionPageStore((state) => state.setCurrentPage);

  const pages = [
    { name: "Add Question", page: "AddQuestion" },
    { name: "Get All Questions", page: "GetAllQuestions" },
    { name: "Get Question By ID", page: "GetQuestionById" },
    { name: "Update Question", page: "UpdateQuestion" },
    { name: "Delete Question", page: "DeleteQuestion" },
    { name: "Delete All Questions", page: "DeleteAllQuestions" },
    { name: "Create new admin", page: "CreateAdmin"}
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Super admin Access
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {pages.map((p) => (
          <Grid item key={p.page} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => setCurrentPage(p.page as any)}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {p.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Picker;
