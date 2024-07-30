import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

interface User {
  firstName: string;
  email: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
  bio: string;
  photos: string[];
  prompts: string[];
}

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (user) {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    }
  };

  const handlePromptChange = (index: number, value: string) => {
    if (user) {
      const newPrompts = [...user.prompts];
      newPrompts[index] = value;
      setUser({ ...user, prompts: newPrompts });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userId = localStorage.getItem("userId");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        user
      );
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}`,
        {
          bio: user.bio,
          photos: user.photos,
          prompts: user.prompts,
        }
      );
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to update settings. Please try again.");
    }
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

  if (!user) {
    return <Typography>No user data available.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Birthday"
              name="birthday"
              type="date"
              value={user.birthday}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Photos</Typography>
            <Grid container spacing={2}>
              {[0, 1, 2, 3].map((index) => (
                <Grid item xs={3} key={index}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" />
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AccountSettings;
