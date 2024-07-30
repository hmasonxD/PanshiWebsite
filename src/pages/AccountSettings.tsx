import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
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
  profileIcon?: string;
}

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginBottom: theme.spacing(2),
}));

const PromptPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

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
        setUser({
          ...response.data,
          prompts: response.data.prompts || ["", "", ""],
          photos: response.data.photos || [],
        });
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

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}/upload-photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newPhotos = [...user.photos];
        newPhotos[index] = response.data.photoUrl;
        setUser({ ...user, photos: newPhotos });
      } catch (error) {
        console.error("Failed to upload photo:", error);
        alert("Failed to upload photo. Please try again.");
      }
    }
  };

  const handleProfileIconUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const formData = new FormData();
      formData.append("profileIcon", file);

      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user-profile/${userId}/upload-profile-icon`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUser({ ...user, profileIcon: response.data.profileIconUrl });
      } catch (error) {
        console.error("Failed to upload profile icon:", error);
        alert("Failed to upload profile icon. Please try again.");
      }
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
          profileIcon: user.profileIcon,
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
    <Container maxWidth="md">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        my={4}
      >
        Account Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleProfileIconUpload}
          />
          <label htmlFor="profile-icon-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <SettingsIcon fontSize="large" />
            </IconButton>
          </label>
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ProfileAvatar src={user.profileIcon}>
                {!user.profileIcon && user.firstName
                  ? user.firstName[0].toUpperCase()
                  : "U"}
              </ProfileAvatar>
            </IconButton>
          </label>
          <Typography variant="caption">
            Click to change profile picture
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={user.bio}
              onChange={handleChange}
            />
          </Grid>
          {user.prompts.map((prompt, index) => (
            <Grid item xs={12} key={index}>
              <PromptPaper elevation={2}>
                <TextField
                  fullWidth
                  label={`Prompt ${index + 1}`}
                  value={prompt}
                  onChange={(e) => handlePromptChange(index, e.target.value)}
                />
              </PromptPaper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Photos
            </Typography>
            <Grid container spacing={2}>
              {[0, 1, 2, 3].map((index) => (
                <Grid item xs={3} key={index}>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`photo-upload-${index}`}
                    type="file"
                    onChange={(e) => handlePhotoUpload(e, index)}
                  />
                  <label htmlFor={`photo-upload-${index}`}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      {user.photos[index] ? (
                        <img
                          src={user.photos[index]}
                          alt={`Photo ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <AddPhotoAlternateIcon fontSize="large" />
                      )}
                    </IconButton>
                  </label>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AccountSettings;
