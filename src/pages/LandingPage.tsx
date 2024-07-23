import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import couple1 from "../assets/1.jpg";
import couple2 from "../assets/2.jpg";
import couple3 from "../assets/3.jpg";

const RootContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A1A2E" : "#2E0854",
  minHeight: "100vh",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#F53391",
  color: "white",
  "&:hover": {
    backgroundColor: "#D62D7E",
  },
  padding: theme.spacing(1, 4),
  fontSize: "1.2rem",
}));

const ImageCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  position: "relative",
  height: 200,
  marginBottom: theme.spacing(2),
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
}));

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <RootContainer>
      <Container>
        <HeroSection>
          <Typography variant="h2" component="h1" gutterBottom color="white">
            Find Your Match
          </Typography>
          <CreateAccountButton
            onClick={handleCreateAccount}
            variant="contained"
          >
            Create Account
          </CreateAccountButton>
        </HeroSection>

        <Typography variant="h4" align="center" gutterBottom color="white">
          Turn Their Success into Your Reality
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              image: couple1,
              text: "Dating made easy with our revolutionary AI matchmaking",
            },
            {
              image: couple2,
              text: "Connect with like-minded individuals in just a few clicks",
            },
            {
              image: couple3,
              text: "Find your perfect partner and start your journey together",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ImageCard>
                <img
                  src={item.image}
                  alt={`Feature ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <CardOverlay>
                  <Typography variant="body2">{item.text}</Typography>
                </CardOverlay>
              </ImageCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootContainer>
  );
};

export default LandingPage;
