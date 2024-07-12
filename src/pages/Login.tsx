import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Fade } from '@mui/material';
import { styled } from '@mui/material'; // Import styled from @mui/material
import { useNavigate } from 'react-router-dom';

const RootContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative',
});

const FormContainer = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(1),
}));

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fadeIn, setFadeIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Login attempt with:', { email, password });
        // Handle login logic here, navigate on success
        navigate('/dashboard');
    };

    useEffect(() => {
        setFadeIn(true); // Trigger fade-in animation on mount
    }, []);

    return (
        <Fade in={fadeIn} timeout={1000}>
            <RootContainer>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <FormContainer>
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
                        <SubmitButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </RootContainer>
        </Fade>
    );
};

export default Login;
