import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../stores/authStore"; // Correct import for Zustand store

interface Question {
  _id: string;
  question: string;
}

interface Topic {
  _id: string;
  name: string;
  description: string;
  questions: Question[]; // ✅ Array of questions
}

const TopicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ✅ Ensure `id` is typed as a string
  const { accessToken } = useAuthStore(); // Access token from Zustand store
  const [topic, setTopic] = useState<Topic | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (accessToken) {
      axios
        .get<Topic>(`http://localhost:5555/api/topics/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` }, // Use token from Zustand store
        })
        .then((res) => setTopic(res.data))
        .catch(() => setError("Topic not found"));
    } else {
      setError("Unauthorized: No access token");
    }
  }, [id, accessToken]);

  if (error) return <p>{error}</p>;
  if (!topic) return <p>Loading...</p>;

  return (
    <div>
      <h2>{topic.name}</h2>
      <p>{topic.description}</p>
      <h3>Questions:</h3>
      <ul>
        {topic.questions.length > 0 ? (
          topic.questions.map((q) => (
            <li key={q._id}>{q.question}</li>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </ul>
    </div>
  );
};

export default TopicDetails;
