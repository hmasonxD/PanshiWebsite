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
  backgroundColor: "#4CAF50", // Green color
  color: "white",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [birthday, setBirthday] = useState({ month: "", day: "", year: "" });

  const handleContinue = () => {
    // Here you would add validation logic
    setStep(step + 1);
  };

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

  const renderWelcomeStep = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h6" gutterBottom>
        How do you want to get started?
      </Typography>
      <StyledButton fullWidth startIcon={<span>f</span>}>
        Continue with Facebook
      </StyledButton>
      <StyledButton fullWidth startIcon={<span>G</span>}>
        Continue with Google
      </StyledButton>
      <Typography variant="h6" gutterBottom>
        or
      </Typography>
      <StyledButton fullWidth startIcon={<span>📞</span>}>
        Continue with Phone Number
      </StyledButton>
      <Button color="secondary">Trouble Logging In?</Button>
      <StyledButton>Continue</StyledButton>
      <Box mt={2}>
        <Button size="small">Terms of Service</Button>
        <Button size="small">Privacy Policy</Button>
      </Box>
    </>
  );

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Panshi
        </Typography>
        {step === 1 ? renderBirthdayStep() : renderWelcomeStep()}
      </StyledBox>
    </StyledContainer>
  );
};

export default Signup;
