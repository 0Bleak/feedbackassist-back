import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import useGuestPageStore from "../stores/guestStore";

const UserInfo: React.FC = () => {
  const { userInfo, setUserInfo, setCurrentPage } = useGuestPageStore();

  const handleNext = () => {
    if (userInfo.email && userInfo.firstName && userInfo.lastName) {
      setCurrentPage("Questionnaire");
    }
  };

  return (
    <Box sx={{ padding: 3, minHeight: "80vh", minWidth: "80vw", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Enter Your Information
      </Typography>
      <TextField
        label="Email"
        fullWidth
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="First Name"
        fullWidth
        value={userInfo.firstName}
        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Last Name"
        fullWidth
        value={userInfo.lastName}
        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
        sx={{ mb: 2 }}
        required
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext}
          disabled={!userInfo.email || !userInfo.firstName || !userInfo.lastName}
          size="large"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;