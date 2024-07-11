import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatchSection from './components/MatchSection';
import Footer from './components/Footer';
import darkTheme from './theme'; // Import the dark theme we created earlier
import Product from './pages/Product';
import About from './pages/About';
import Support from './pages/Support';
import Download from './pages/Download';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    const lightTheme = createTheme({
        ...darkTheme,
        palette: {
            ...darkTheme.palette,
            mode: 'light',
            text: {
                primary: '#000000'
            },
            background: {
                default: '#ffffff',
                paper: '#ffffff',
            },
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh' }}>
                <Router>
                    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <Routes>
                        <Route path="/" element={<MatchSection />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/download" element={<Download />} />
                    </Routes>
                </Router>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default App;
