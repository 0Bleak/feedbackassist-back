import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ContentCopy as CopyIcon, Check as CheckIcon } from "@mui/icons-material";
import useGuestPageStore from "../stores/guestStore";

const Results: React.FC = () => {
  const { topic, responses, setCurrentPage, setResponses, setUserInfo } = useGuestPageStore();
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});

  const getSelectedOptionsWithUrls = () => {
    if (!topic) return [];
    return topic.questions.map((question) => {
      const selectedOption = responses[question._id];
      const option = question.options.find((opt) => opt.value === selectedOption);
      return {
        id: question._id,
        question: question.label,
        selectedOption,
        url: option?.url || null,
      };
    });
  };

  const handleTryAgain = () => {
    setResponses({});
    setUserInfo({ email: "", firstName: "", lastName: "" });
    setCurrentPage("PickTopic");
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinks((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedLinks((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh", // Ensures no unnecessary scrolling
        padding: 3,
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}>
        Your Results
      </Typography>

      <Box sx={{ width: "100%", overflowY: "auto", maxHeight: "50vh", paddingBottom: 2 }}>
        {getSelectedOptionsWithUrls().map((item, index) => (
          <Paper
            key={item.id}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#1E1E1E",
              borderRadius: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", mb: 1, fontWeight: 500 }}>
              {index + 1}. {item.question}
            </Typography>
            <Typography sx={{ color: "#bbb", mb: 1 }}>
              Your answer: <strong>{item.selectedOption}</strong>
            </Typography>
            {item.url && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#282828",
                  p: 1,
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#90caf9",
                    wordBreak: "break-word",
                    fontSize: "0.9rem",
                    flex: 1,
                    mr: 1,
                  }}
                >
                  {item.url}
                </Typography>
                <Tooltip title={copiedLinks[item.id] ? "Copied!" : "Copy"}>
                  <IconButton
                    onClick={() => handleCopyLink(item.url!, item.id)}
                    sx={{
                      color: copiedLinks[item.id] ? "#66bb6a" : "#90caf9",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {copiedLinks[item.id] ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleTryAgain}
        size="large"
        sx={{
          mt: 3,
          px: 4,
          py: 1.2,
          borderRadius: 3,
          fontWeight: 500,
          mb: 5, // Ensures button is fully visible
        }}
      >
        Take Another Questionnaire
      </Button>
    </Box>
  );
};

export default Results;
