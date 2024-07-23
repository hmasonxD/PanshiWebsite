import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#3B0256", // Purple background
  color: "white",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly transparent dark background
});

const StyledButton = styled(Button)({
  margin: "10px",
  backgroundColor: "#F53391",
  color: "white",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [birthday, setBirthday] = useState({ month: "", day: "", year: "" });
  const [firstName, setFirstName] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    setStep(step + 1);
  };

  const renderGenderStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        What is your gender?
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
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
      <Button onClick={handleContinue} style={{ color: "white" }}>
        Not Now
      </Button>
      <Button
        onClick={handleContinue}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
        }}
      >
        Skip
      </Button>
    </>
  );

  const renderWelcomeStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h6" gutterBottom>
        How do you want to get started?
      </Typography>
      <StyledButton
        onClick={handleContinue}
        fullWidth
        startIcon={<span>f</span>}
      >
        Continue with Facebook
      </StyledButton>
      <StyledButton
        onClick={handleContinue}
        fullWidth
        startIcon={<span>G</span>}
      >
        Continue with Google
      </StyledButton>
      <Typography variant="h6" gutterBottom>
        or
      </Typography>
      <StyledButton
        onClick={handleContinue}
        fullWidth
        startIcon={<span>📞</span>}
      >
        Continue with Phone Number
      </StyledButton>
      <Button color="secondary" onClick={handleContinue}>
        Trouble Logging In?
      </Button>
      <StyledButton>Continue</StyledButton>
      <Box mt={2}>
        <Button size="small">Terms of Service</Button>
        <Button size="small">Privacy Policy</Button>
      </Box>
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
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
      <Button
        onClick={handleContinue}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
        }}
      >
        Not Now
      </Button>
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
        <Typography variant="h4" gutterBottom>
          Panshi
        </Typography>
        {renderStep()}
      </StyledBox>
    </StyledContainer>
  );
};

export default Signup;
