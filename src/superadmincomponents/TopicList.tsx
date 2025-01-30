import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { Box, Typography, List, ListItem, Button ,CircularProgress} from "@mui/material";
import useSuperAdminPageStore from "../stores/superAdminPageStore"; // Zustand store for navigation

interface Topic {
  _id: string;
  name: string;
}

const TopicList: React.FC = () => {
  const { accessToken } = useAuthStore();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const setCurrentPage = useSuperAdminPageStore((state) => state.setCurrentPage);

  useEffect(() => {
    if (accessToken) {
      axios
        .get<Topic[]>("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setTopics(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch topics");
          setLoading(false);
        });
    } else {
      setError("Unauthorized: No access token");
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Topics</Typography>
      <List>
        {topics.map((topic) => (
          <ListItem key={topic._id}>
            <Typography>{topic.name}</Typography>
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        onClick={() => setCurrentPage("Picker")} // Navigate back to the Picker page
        sx={{ mt: 2 }}
      >
        Return
      </Button>
    </Box>
  );
};

export default TopicList;