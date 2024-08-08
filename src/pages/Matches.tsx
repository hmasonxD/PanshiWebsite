import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const usersPerPage = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUserId = localStorage.getItem("userId");
        const response = await axios.get<User[]>(
          `${process.env.REACT_APP_API_URL}/api/users?currentUserId=${currentUserId}`
        );
        setUsers(response.data);
        setTotalPages(Math.ceil(response.data.length / usersPerPage));
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
      const user = users.find((u) => u.id === userId);
      if (user?.isLiked) {
        // Unlike
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/like/${userId}?likerId=${currentUserId}`
        );
      } else {
        // Like
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/like/${userId}`,
          {
            likerId: currentUserId,
          }
        );
      }
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isLiked: !user.isLiked } : user
        )
      );
    } catch (error) {
      console.error("Failed to like/unlike user:", error);
    }
  };

  const handleMessage = (userId: string) => {
    navigate(`/messaging?userId=${userId}`);
  };

  const handleOpenProfile = (userId: string) => {
    navigate(`/user-profile/${userId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Discover Matches
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {paginatedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={{
                ...user,
                profilePicture: `${process.env.REACT_APP_API_URL}${user.profileIcon}`,
              }}
              onLike={() => handleLike(user.id)}
              onMessage={() => handleMessage(user.id)}
              onOpenProfile={() => handleOpenProfile(user.id)}
              isLiked={user.isLiked}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default Matches;
