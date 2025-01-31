import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import useGuestPageStore from "../stores/guestStore";
import type { GuestPageState } from "../stores/guestStore";

const GuestPicker: React.FC = () => {
  const setCurrentPage = useGuestPageStore((state) => state.setCurrentPage);

  const pages: { name: string; page: GuestPageState["currentPage"] }[] = [
    { name: "Consent Form", page: "ConsentForm" }, // Fixed typo here
    { name: "Questionnaire", page: "Questionnaire" },
    { name: "Pick Topic", page: "PickTopic" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Guest Access
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensures spacing between elements
                minWidth: "200px",
                margin: "2rem",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => setCurrentPage(p.page)}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
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

export default GuestPicker;