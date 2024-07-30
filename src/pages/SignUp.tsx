import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/logodark.png";
import logoLight from "../assets/logolight.png";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(-20),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SignUp: React.FC = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [birthday, setBirthday] = useState({ month: "", day: "", year: "" });
  const [firstName, setFirstName] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false); // eslint-disable-line
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleSignUp = async () => {
    try {
      const birthDate = new Date(
        parseInt(birthday.year),
        [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].indexOf(birthday.month),
        parseInt(birthday.day)
      );

      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date");
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
        email,
        password,
        firstName,
        gender,
        birthday: birthDate.toISOString(),
      });
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const renderGenderStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        What is your gender?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // This stacks items vertically
          alignItems: "center", // Centers items horizontally within the Box
          justifyContent: "center", // Centers items vertically within the Box
          mb: 2, // Adds margin-bottom for spacing
        }}
      >
        <StyledButton onClick={() => setGender("Man")}>Man</StyledButton>
        <StyledButton onClick={() => setGender("Woman")}>Woman</StyledButton>
        <StyledButton onClick={() => setGender("Other")}>Other</StyledButton>
      </Box>
      {gender === "Other" && (
        <TextField
          label="Specify"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={showGender}
            onChange={(e) => setShowGender(e.target.checked)}
            color="primary"
          />
        }
        label="Show my gender on my profile"
      />
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
    </>
  );

  const renderBirthdayStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        When is your birthday?
      </Typography>
      <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
        <FormControl style={{ width: "30%" }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={birthday.month}
            onChange={(e) =>
              setBirthday({ ...birthday, month: e.target.value as string })
            }
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Day"
          type="number"
          value={birthday.day}
          onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}
          style={{ width: "30%" }}
        />
        <TextField
          label="Year"
          type="number"
          value={birthday.year}
          onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}
          style={{ width: "30%" }}
        />
      </Box>
      <Typography variant="caption">Please enter a valid date</Typography>
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
    </>
  );

  const renderFirstNameStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        What is your first name?
      </Typography>
      <Typography variant="caption" gutterBottom>
        This is how you will appear on your profile. This cannot be changed
        later.
      </Typography>
      <TextField
        label="Type your first name here"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
    </>
  );

  const renderLocationStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Turn on location services
      </Typography>
      <StyledButton onClick={() => setLocationEnabled(true)}>
        Set Your Location
      </StyledButton>
      <Button
        onClick={handleContinue}
        style={{ color: theme.palette.primary.contrastText, margin: "10px" }}
      >
        Not Now
      </Button>
      <Button
        onClick={handleContinue}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: theme.palette.primary.contrastText,
        }}
      >
        Skip
      </Button>
    </>
  );

  const renderWelcomeStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome to Panshi!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Rules to follow
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rule one: Respect others.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rule two: Be honest.
      </Typography>
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
    </>
  );

  const renderEmailStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Add your email to secure your account
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <StyledButton onClick={handleSignUp}>Sign Up</StyledButton>
    </>
  );
  const renderVerifyIdentityStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Verify your identity
      </Typography>
      <StyledButton onClick={handleContinue}>Resend Code</StyledButton>
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
    </>
  );

  const renderPhoneNumberStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Could we get your phone number?
      </Typography>
      <TextField
        label="Phone Number"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <StyledButton onClick={handleContinue}>Send Code</StyledButton>
    </>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderGenderStep();
      case 2:
        return renderBirthdayStep();
      case 3:
        return renderFirstNameStep();
      case 4:
        return renderLocationStep();
      case 5:
        return renderWelcomeStep();
      case 6:
        return renderEmailStep();
      case 7:
        return renderVerifyIdentityStep();
      case 8:
        return renderPhoneNumberStep();
      default:
        return renderGenderStep();
    }
  };

  return (
    <StyledContainer>
      <StyledBox>
        <Box
          component="img"
          src={theme.palette.mode === "dark" ? logoDark : logoLight}
          alt="Panshi Logo"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100px", mb: 3 }}
        />
        {renderStep()}
      </StyledBox>
    </StyledContainer>
  );
};

export default SignUp;
