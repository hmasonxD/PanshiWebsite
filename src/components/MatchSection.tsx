import React from "react";
import { useNavigate } from "react-router-dom"; // Correct import statement
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh - 64px)", // Adjust based on your navbar height
  textAlign: "center",
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  transition: "background-color 0.5s ease-in-out",
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const MatchSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/LandingPage");
  };

  return (
    <RootContainer>
      <HeaderTypography variant="h2" gutterBottom>
        Panshi
      </HeaderTypography>
      <Typography variant="h5" gutterBottom>
        Connect with your perfect match
      </Typography>
      <ButtonStyled
        onClick={handleGetStartedClick}
        variant="contained"
        color="secondary"
        size="large"
      >
        Get Started
      </ButtonStyled>
    </RootContainer>
  );
};

export default MatchSection;
