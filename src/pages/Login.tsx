import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Fade,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logoDark from "../assets/logodark.png";
import logoLight from "../assets/logolight.png";

const RootContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "relative",
  // color: "white",
});

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(-20), // Adjust this to move form up
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(3),
  backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly transparent dark background
  borderRadius: theme.shape.borderRadius,
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
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
  const theme = useTheme();
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
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      if (response.data.id) {
        await login(response.data.id.toString());
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <Fade in={fadeIn} timeout={1000}>
      <RootContainer>
        <FormContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            bgcolor: theme.palette.background.default, // Adjust background color as needed
            p: 3,
          }}
        >
          <Box
            component="img"
            src={theme.palette.mode === "dark" ? logoDark : logoLight}
            alt="Panshi Logo"
            sx={{
              height: "100px",
              mb: 3,
            }}
          />
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
            />
            <SubmitButton type="submit" fullWidth variant="contained">
              Sign In
            </SubmitButton>
          </Form>
          <Button fullWidth onClick={() => navigate("/signup")}>
            Don't have an account? Sign Up
          </Button>
        </FormContainer>
      </RootContainer>
    </Fade>
  );
};

export default Login;
