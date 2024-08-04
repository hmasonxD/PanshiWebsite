import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  Button,
  Box,
  Avatar,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface UserData {
  firstName: string;
  gender: string;
  birthday: string;
  bio: string;
  photos: string[];
  prompts: string[];
  profileIcon?: string;
}

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginBottom: theme.spacing(2),
}));

const PromptCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserId = localStorage.getItem("userId");
        const profileUserId = userId || currentUserId;

        if (!profileUserId) {
          setError("No user ID provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user-profile/${profileUserId}`
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
  }, [userId]);

  const calculateAge = (birthday: string) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getFullImageUrl = (photoUrl: string | undefined) => {
    if (!photoUrl) return undefined;
    if (photoUrl.startsWith("http")) {
      return photoUrl;
    }
    return `${process.env.REACT_APP_API_URL}${photoUrl}`;
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

  const isCurrentUser =
    userId === undefined || userId === localStorage.getItem("userId");

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <ProfileAvatar src={getFullImageUrl(userData.profileIcon)}>
          {userData.firstName ? userData.firstName[0].toUpperCase() : "U"}
        </ProfileAvatar>
        <Typography variant="h4" component="h1" gutterBottom>
          {userData.firstName}'s Profile
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {userData.gender}, {calculateAge(userData.birthday)} years old
        </Typography>
        {isCurrentUser && (
          <IconButton
            color="primary"
            aria-label="account settings"
            onClick={() => navigate("/account-settings")}
          >
            <SettingsIcon fontSize="medium" />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography paragraph>
            {userData.bio || "No bio available"}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            My Photos
          </Typography>
          <Grid container spacing={2}>
            {userData.photos &&
              userData.photos.map((photo, index) => (
                <Grid item xs={6} key={index}>
                  <Card>
                    <img
                      src={getFullImageUrl(photo)}
                      alt={`Photo ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            My Prompts
          </Typography>
          {userData.prompts && userData.prompts.length > 0 ? (
            userData.prompts.map((prompt, index) => (
              <PromptCard key={index} elevation={2}>
                <Typography variant="body1">{prompt}</Typography>
              </PromptCard>
            ))
          ) : (
            <Typography>No prompts available</Typography>
          )}
        </Grid>
      </Grid>

      {isCurrentUser && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate("/account-settings")}
          >
            Edit Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;
