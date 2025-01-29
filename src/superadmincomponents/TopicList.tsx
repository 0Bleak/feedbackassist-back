import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/authStore"; // Import useAuthStore to get the token

interface Topic {
  _id: string;
  name: string;
}

const TopicList: React.FC = () => {
  const { accessToken } = useAuthStore(); // Access token from Zustand store
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (accessToken) {
      axios
        .get<Topic[]>("http://localhost:5555/api/topics", {
          headers: { Authorization: `Bearer ${accessToken}` }, // Use token for authorization
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
  }, [accessToken]); // Fetch topics when accessToken changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic._id}>
            <a href={`/topics/${topic._id}`}>{topic.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
