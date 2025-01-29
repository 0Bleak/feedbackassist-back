import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../stores/authStore"; // Import your Zustand store

const CreateTopic = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  // Access token from Zustand store
  const token = useAuthStore((state) => state.accessToken); // Use Zustand store to get the token
  
  console.log("Token from Zustand:", token); // Debugging line

  // Handle form submission to create a topic
  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!name || !description) {
      setError("Please provide both name and description.");
      return;
    }

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      };

      const response = await axios.post(
        "http://localhost:5555/api/topics/create",
        { name, description },
        config
      );

      if (response.status === 201) {
        // Handle success response
        console.log("Topic created successfully:", response.data);
        setName("");
        setDescription("");
        setError("");
      }
    } catch (error: any) {
      // Handle error response
      console.error("Error creating topic:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="create-topic">
      <h2>Create a New Topic</h2>
      <form onSubmit={handleCreateTopic}>
        <div>
          <label htmlFor="name">Topic Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Create Topic</button>
      </form>
    </div>
  );
};

export default CreateTopic;
