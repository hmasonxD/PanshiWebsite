import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MatchSection from "./components/MatchSection";
import Footer from "./components/Footer";
import { darkTheme, lightTheme } from "./theme";
import Product from "./pages/Product";
import About from "./pages/About";
import Support from "./pages/Support";
import Download from "./pages/Download";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PageTransition from "./PageTransition";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AccountSettings from "./pages/AccountSettings";
import UserProfile from "./pages/UserProfile";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <PageTransition>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<MatchSection />} />
                  <Route path="/landingpage" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/download" element={<Download />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute
                        authenticationPath="/login"
                        element={<Dashboard />}
                      />
                    }
                  />
                  <Route
                    path="/account-settings"
                    element={
                      <ProtectedRoute
                        authenticationPath="/login"
                        element={<AccountSettings />}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute
                        authenticationPath="/login"
                        element={<UserProfile />}
                      />
                    }
                  />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </PageTransition>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
