import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import couple1 from "../assets/1.jpg";
import couple2 from "../assets/2.jpg";
import couple3 from "../assets/3.jpg";

const RootContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#4B0082", // Deep purple background
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#2E0854", // Darker purple for hero section
  padding: theme.spacing(8, 0),
  textAlign: "center",
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FF1493", // Hot pink
  color: "white",
  "&:hover": {
    backgroundColor: "#FF69B4", // Light pink on hover
  },
  padding: theme.spacing(1, 4),
  fontSize: "1.2rem",
  borderRadius: "25px",
}));

const ImageCard = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  overflow: "hidden",
  position: "relative",
  height: 300,
  marginBottom: theme.spacing(2),
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  borderRadius: "0 0 15px 15px",
  color: "white",
  textAlign: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1A1A2E", // Dark blue for footer
  color: "white",
  padding: theme.spacing(4, 0),
  marginTop: "auto",
}));

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const features = [
    {
      image: couple1,
      text: "Dating made easy with our revolutionary AI matchmaking",
      color: "#32CD32", // Lime green
    },
    {
      image: couple2,
      text: "Connect with like-minded individuals in just a few clicks",
      color: "#FFA500", // Orange
    },
    {
      image: couple3,
      text: "Find your perfect partner and start your journey together",
      color: "#FF69B4", // Light pink
    },
  ];

  return (
    <RootContainer>
      <HeroSection>
        <Container>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="white"
            fontWeight="bold"
          >
            Find Your Match
          </Typography>
          <CreateAccountButton
            onClick={handleCreateAccount}
            variant="contained"
          >
            Create Account
          </CreateAccountButton>
        </Container>
      </HeroSection>

      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="white"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Turn Their Success into Your Reality
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ImageCard>
                <img
                  src={item.image}
                  alt={`Feature ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <CardOverlay style={{ backgroundColor: item.color }}>
                  <Typography variant="body2">{item.text}</Typography>
                </CardOverlay>
              </ImageCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer>
        <Container>
          <Typography variant="body2" align="center">
            © 2024 Panshi. All rights reserved.
          </Typography>
        </Container>
      </Footer>
    </RootContainer>
  );
};

export default LandingPage;
