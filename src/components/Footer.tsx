import React from 'react';
import { Box, Typography, Link, Grid, Button } from '@mui/material';
import { YouTube, Instagram, Twitter, Facebook, MusicNote } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#F9E4A0', p: 4 }} component="footer">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom>
                        Panshi Dating Website: Find Your Match!
                    </Typography>
                    {/*<Link href="#" color="inherit" display="block">Privacy Policy</Link>*/}
                    {/*<Link href="#" color="inherit" display="block">Terms & Conditions</Link>*/}
                    {/*<Link href="#" color="inherit" display="block">Cookie Policy</Link>*/}
                    {/*<Link href="#" color="inherit" display="block">FAQ</Link>*/}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom>
                        Careers
                    </Typography>
                    <Link href="#" color="inherit" display="block">Careers Portal</Link>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom>
                        Social
                    </Typography>
                    <Box>
                        <YouTube />
                        <Instagram sx={{ ml: 1 }} />
                        <Twitter sx={{ ml: 1 }} />
                        <Facebook sx={{ ml: 1 }} />
                        <MusicNote sx={{ ml: 1 }} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom>
                        Get the App
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<img src="/api/placeholder/20/20" alt="Google Play" />}
                        sx={{ mb: 1, bgcolor: 'white', color: 'black' }}
                    >
                        Get it on Google Play
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<img src="/api/placeholder/20/20" alt="App Store" />}
                        sx={{ bgcolor: 'white', color: 'black' }}
                    >
                        Download on the App Store
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                FAQ / Safety Tips / Terms & Conditions / Cookie Policy / Privacy Settings
            </Typography>
        </Box>
    );
};

export default Footer;