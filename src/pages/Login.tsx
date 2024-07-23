import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RootContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "relative",
  backgroundColor: "#3B0256", // Purple background
  color: "white",
});

const FormContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  marginTop: theme.spacing(1),
  padding: theme.spacing(3),
  backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly transparent dark background
  borderRadius: theme.shape.borderRadius,
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: "#F53391", // purple color
  color: "white",
  "&:hover": {
    backgroundColor: "#45a049",
  },
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login("fake-token"); // Replace with actual login logic
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <Fade in={fadeIn} timeout={1000}>
      <RootContainer>
        <FormContainer>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Panshi
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <Form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
            <SubmitButton type="submit" fullWidth variant="contained">
              Sign In
            </SubmitButton>
          </Form>
          <Button
            fullWidth
            onClick={() => navigate("/signup")}
            style={{ color: "white" }}
          >
            Don't have an account? Sign Up
          </Button>
        </FormContainer>
      </RootContainer>
    </Fade>
  );
};

export default Login;
