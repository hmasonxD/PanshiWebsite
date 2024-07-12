import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Switch,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    ListItemButton,
    ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import logoDark from '../assets/logodark.png';
import logoLight from '../assets/logolight.png';
import { useNavigate } from 'react-router-dom';

import { lightTheme, darkTheme } from '../theme';

type CustomTheme = typeof lightTheme;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    height: '115px',
    backgroundColor: (theme as CustomTheme).customPalette.navbarBackground,
    boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)({
    height: '100%',
    display: 'flex',
    flexDirection: 'row-reverse', // Reverse the row direction
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 32px',
});

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#F53391',
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '18px',
    padding: '8px 12px',
}));

const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '24px',
    padding: '12px 24px',
    borderRadius: '20px',
    '&:hover': {
        backgroundColor: '#d62a7a',
    },
}));

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme() as CustomTheme;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const navItems = [
        { label: 'Product', path: '/product' },
        { label: 'About US', path: '/about' },
        { label: 'Support', path: '/support' },
        { label: 'Download', path: '/download' }
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
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '12px 30px' }}>
                <Typography variant="body2" sx={{ mr: 1, color: theme.palette.text.primary }}>Dark Mode</Typography>
                <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="default"
                />
            </Box>
        </Box>
    );

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <StyledAppBar position="static">
                <StyledToolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 20 }}>
                        {!isMobile && (
                            <>
                                <NavButton>Language</NavButton>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <Typography variant="body2" sx={{ mr: 2, color: theme.palette.text.primary }}>Dark Mode</Typography>
                                    <Switch
                                        checked={darkMode}
                                        onChange={toggleDarkMode}
                                        color="default"
                                    />
                                </Box>
                            </>
                        )}
                        <LoginButton variant="contained" onClick={() => navigate('/login')}>
                            Login
                        </LoginButton>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={toggleDrawer(true)}
                                sx={{ ml: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 20 }}>
                        <img
                            src={darkMode ? logoDark : logoLight}
                            alt="Panshi Logo"
                            style={{ height: '80px', marginRight: '24px', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        />
                        {!isMobile && navItems.map((item) => (
                            <NavButton key={item.label} onClick={() => navigate(item.path)}>{item.label}</NavButton>
                        ))}
                    </Box>
                </StyledToolbar>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {drawer}
                </Drawer>
            </StyledAppBar>
        </ThemeProvider>
    );
};

export default Navbar;
