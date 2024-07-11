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
    ListItemButton
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import theme from "../theme"; // Adjust the path as necessary

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    minHeight: '48px',
});

const NavButton = styled(Button)({
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#F53391',
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '18px',
    padding: '8px 12px',
});

const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#F53391',
    color: theme.palette.mode === 'dark' ? '#ffffff' : 'black',
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '20px',
    padding: '6px 16px',
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        { label: 'About Us', path: '/about' },
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
                    <ListItem key={item.label} button onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
            <StyledToolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Panshi Logo" style={{ height: '50px', marginRight: '16px', cursor: 'pointer' }} onClick={() => navigate('/')} />
                    {!isMobile && navItems.map((item) => (
                        <NavButton key={item.label} onClick={() => navigate(item.path)}>{item.label}</NavButton>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!isMobile && (
                        <>
                            <NavButton>Language</NavButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                <Typography variant="body2" sx={{ mr: 1, color: '#ffffff' }}>Dark Mode</Typography>
                                <Switch
                                    checked={darkMode}
                                    onChange={toggleDarkMode}
                                    color="default"
                                />
                            </Box>
                        </>
                    )}
                    <LoginButton variant="contained">
                        Login
                    </LoginButton>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
            </StyledToolbar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
