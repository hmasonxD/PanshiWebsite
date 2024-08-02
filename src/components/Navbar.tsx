import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ThemeProvider,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Switch,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { lightTheme, darkTheme } from "../theme";
import LanguagePopup from "./LanguagePopup";
import { useAuth } from "../AuthContext";
import logoDark from "../assets/logodark.png";
import logoLight from "../assets/logolight.png";

type CustomTheme = typeof lightTheme;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: "75px",
  backgroundColor: (theme as CustomTheme).customPalette.navbarBackground,
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)({
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px",
});

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#F3EFF4" : "#F53391",
  textTransform: "none",
  fontWeight: "normal",
  fontSize: "16px",
  padding: "8px 16px",
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#F3EFF4" : "#F53391",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const LoginButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.mode === "dark" ? "#F3EFF4" : "#F53391",
  // background: theme.palette.mode === "dark" ? "#F9E4A0" : "#F3EFF4",
  color: "#F3EFF4",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "8px 24px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#E67C7C",
  },
}));

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { isAuthenticated, logout } = useAuth();
  const theme = useTheme() as CustomTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleProfileClose();
  };

  const navItems = [
    { label: "Find Your Match", path: "/matches" },
    { label: "Messages", path: "/messaging" },
    { label: "Product", path: "/product" },
    { label: "About Us", path: "/about" },
    { label: "Support", path: "/support" },
    { label: "Download", path: "/download" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }}>
        <Typography
          variant="body2"
          sx={{ mr: 1, color: theme.palette.text.primary }}
        >
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={darkMode ? logoDark : logoLight}
              alt="Panshi Logo"
              style={{ height: "60px", marginRight: "32px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            {!isMobile &&
              navItems.map((item) => (
                <NavButton key={item.label} onClick={() => navigate(item.path)}>
                  {item.label}
                </NavButton>
              ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <>
                <NavButton onClick={handleLanguageClick}>Language</NavButton>
                <LanguagePopup
                  anchorEl={languageAnchorEl}
                  onClose={handleLanguageClose}
                />
                <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                  <MaterialUISwitch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />
                </Box>
              </>
            )}
            {isAuthenticated ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ProfileButton
                  onClick={handleProfileClick}
                  endIcon={<AccountCircleIcon />}
                >
                  My Profile
                </ProfileButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={profileAnchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileClose}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleProfileClose();
                    }}
                  >
                    View Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/account-settings");
                      handleProfileClose();
                    }}
                  >
                    Account Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <LoginButton
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Login
              </LoginButton>
            )}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </StyledToolbar>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </StyledAppBar>
    </ThemeProvider>
  );
};

export default Navbar;
