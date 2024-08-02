import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import {
  YouTube,
  Instagram,
  Twitter,
  Facebook,
  Apple,
  Android,
} from "@mui/icons-material";
import logoDark from "../assets/logodark.png";
import logoLight from "../assets/logolight.png";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.customPalette.navbarBackground,
        color: theme.palette.text.primary,
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Box
              component="img"
              src={theme.palette.mode === "dark" ? logoDark : logoLight}
              alt="Panshi Logo"
              sx={{ height: 40, mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" paragraph>
              Find Your Match with Panshi - Where Connections Blossom
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="youtube" color="inherit" sx={{ mr: 2 }}>
                <YouTube />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <Instagram />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Get the App
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Apple />}
              sx={{ mb: 2, width: "100%", justifyContent: "flex-start" }}
            >
              Download on the App Store
            </Button>
            <Button
              variant="outlined"
              startIcon={<Android />}
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              Get it on Google Play
            </Button>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Panshi Dating Website. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
