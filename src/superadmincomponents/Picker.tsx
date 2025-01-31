import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import useSuperAdminPageStore from "../stores/superAdminPageStore";
import type { QuestionPageState } from "../stores/superAdminPageStore";

const Picker: React.FC = () => {
  const setCurrentPage = useSuperAdminPageStore((state) => state.setCurrentPage);
  
  const pages: { name: string; page: QuestionPageState["currentPage"] }[] = [
    { name: "Add Question", page: "AddQuestion" },
    { name: "Add Question to Topic", page: "AddQuestionToTopic" },
    { name: "Get All Questions", page: "GetAllQuestions" },
    { name: "Get Question By ID", page: "GetQuestionById" },
    { name: "Update Question", page: "UpdateQuestion" },
    { name: "Delete Question", page: "DeleteQuestion" },
    { name: "Delete All Questions", page: "DeleteAllQuestions" },
    { name: "Create New Admin", page: "CreateAdmin" },
    { name: "Add Topic", page: "AddTopic" },
    { name: "Update Topic", page: "UpdateTopic" },
    { name: "Get All Topics", page: "GetAllTopics" },
    { name: "Get Topic By ID", page: "GetTopicById" },
    { name: "Delete Topic", page: "DeleteTopic" },
    { name: "View User Responses", page: "ViewUserResponses" }, // Add ViewUserResponses for superadmin
  ];
  

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Super Admin Access
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
              onClick={() => setCurrentPage(p.page)}
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
