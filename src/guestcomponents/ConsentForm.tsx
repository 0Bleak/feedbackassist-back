import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import useGuestPageStore from "../stores/guestStore";
import axios from "axios";

const ConsentForm: React.FC = () => {
  const { userInfo, responses, topic, setCurrentPage } = useGuestPageStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleConsent = async (consent: boolean) => {
    if (consent) {
      try {
        const responseData = {
          ...userInfo,
          topicId: topic?._id,
          responses: Object.entries(responses).map(([questionId, chosenOption]) => ({
            questionId,
            chosenOption,
          })),
        };
        
        await axios.post("http://localhost:5555/api/responses/save", responseData);
        setMessage("Responses saved successfully!");
        setSeverity("success");
      } catch (error) {
        setMessage("Error saving responses.");
        setSeverity("error");
      }
    } else {
      setMessage("Data disposed of successfully!");
      setSeverity("success");
    }
    
    setSnackbarOpen(true);

    // Wait for snackbar to show before redirecting
    setTimeout(() => {
      setCurrentPage("Results");
    }, 2000);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", minWidth: "80vw", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Data Consent
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Do you consent to us keeping your data? If not, it will be disposed of properly.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleConsent(true)}
          size="large"
        >
          Yes, I consent
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => handleConsent(false)}
          size="large"
        >
          No, dispose of my data
        </Button>
      </Box>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={severity} 
          variant="filled" 
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConsentForm;