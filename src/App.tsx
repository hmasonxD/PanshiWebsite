import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import Matches from "./pages/Matches";
import Messaging from "./pages/Messaging";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
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
              <Route path="/" element={<LandingPage />} />
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
              <Route
                path="/matches"
                element={
                  <ProtectedRoute
                    authenticationPath="/login"
                    element={<Matches />}
                  />
                }
              />
              <Route
                path="/messaging"
                element={
                  <ProtectedRoute
                    authenticationPath="/login"
                    element={<Messaging />}
                  />
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </PageTransition>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
