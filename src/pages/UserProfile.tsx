import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Box,
  Avatar,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  firstName: string;
  gender: string;
  birthday: string;
  bio: string;
  photos: string[];
  prompts: string[];
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const renderPhotoPlaceholder = (index: number) => (
    <Card
      sx={{
        height: 140,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <AddIcon />
      </IconButton>
    </Card>
  );
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>No profile data available.</Typography>
      </Box>
    );
  }

  const calculateAge = (birthday: string) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={
            userData.photos && userData.photos.length > 0
              ? userData.photos[0]
              : undefined
          }
          sx={{ width: 100, height: 100, marginRight: 2 }}
        >
          {userData.firstName ? userData.firstName[0].toUpperCase() : "?"}
        </Avatar>
        <Typography variant="h4" component="h1">
          {userData.firstName}'s Profile
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">About Me</Typography>
          <Typography>{userData.bio || "No bio available"}</Typography>
          <Box mt={2}>
            <Typography>
              Age: {userData.birthday ? calculateAge(userData.birthday) : "N/A"}
            </Typography>
            <Typography>
              Gender: {userData.gender || "Not specified"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">My Photos</Typography>
          <Grid container spacing={2}>
            {[0, 1, 2, 3].map((index) => (
              <Grid item xs={6} key={index}>
                {userData.photos && userData.photos[index] ? (
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={userData.photos[index]}
                      alt={`Photo ${index + 1}`}
                    />
                  </Card>
                ) : (
                  renderPhotoPlaceholder(index)
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">My Prompts</Typography>
          {userData.prompts && userData.prompts.length > 0 ? (
            userData.prompts.map((prompt, index) => (
              <Typography key={index} paragraph>
                {prompt}
              </Typography>
            ))
          ) : (
            <Typography>No prompts available</Typography>
          )}
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/account-settings")}
        >
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
