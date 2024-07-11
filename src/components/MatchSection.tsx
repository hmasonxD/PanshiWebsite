import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MatchSection = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 64px)', // Adjust based on your navbar height
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Panshi
            </Typography>
            <Typography variant="h5" gutterBottom>
                Connect with your perfect match
            </Typography>
            <Button variant="contained" color="secondary" size="large">
                Get Started
            </Button>
        </Box>
    );
};

export default MatchSection;