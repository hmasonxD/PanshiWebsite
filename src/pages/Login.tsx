import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const theme = useTheme();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Login attempt with:', { email, password });
        // Here you would typically handle the login logic
        // For now, let's just navigate to a hypothetical dashboard
        navigate('/dashboard');
    };

    return (
        <StyledContainer>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <StyledForm onSubmit={handleSubmit}>
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
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </StyledButton>
            </StyledForm>
        </StyledContainer>
    );
};

export default Login;