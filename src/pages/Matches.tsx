import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";

interface User {
  id: string;
  firstName: string;
  age: number;
  bio: string;
  profileIcon: string;
  isLiked: boolean;
}

const Matches: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUserId = localStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users?currentUserId=${currentUserId}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLike = async (userId: string) => {
    try {
      const currentUserId = localStorage.getItem("userId");
      await axios.post(`${process.env.REACT_APP_API_URL}/api/like/${userId}`, {
        likerId: currentUserId,
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isLiked: true } : user
        )
      );
    } catch (error) {
      console.error("Failed to like user:", error);
    }
  };

  const handleMessage = async (userId: string) => {
    try {
      const currentUserId = localStorage.getItem("userId");
      await axios.post(`${process.env.REACT_APP_API_URL}/api/messages`, {
        senderId: currentUserId,
        recipientId: userId,
        content: "Hi there! I'd like to connect with you.",
      });
      navigate(`/messaging?userId=${userId}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Discover Matches
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={{
                ...user,
                profilePicture: `${process.env.REACT_APP_API_URL}${user.profileIcon}`,
              }}
              onLike={() => handleLike(user.id)}
              onMessage={() => handleMessage(user.id)}
              isLiked={user.isLiked}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Matches;
