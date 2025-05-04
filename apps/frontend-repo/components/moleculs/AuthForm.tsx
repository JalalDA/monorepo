'use client';

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';

export default function AuthForm() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleAuth = async () => {
        setError('');
        try {
            if (mode === 'login') {
                 await signInWithEmailAndPassword(auth, email, password);
                router.push('/');
            } else {
                const data = await createUserWithEmailAndPassword(auth, email, password);
                console.log({data});
                if (data) {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/create-user-data`, {
                        uid: data.user.uid,
                        name: userName,
                        email: data.user.email,
                    })
                    if (response.status === 200) {
                        alert('Success register user');
                        router.push('/');
                    } else {
                        alert('User data not saved!');
                    }
                }
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                p={4}
                borderRadius={2}
                boxShadow={3}
                bgcolor="background.paper"
            >
                <Typography variant="h5" align="center">
                    {mode === 'login' ? 'Login' : 'Register'}
                </Typography>

                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    fullWidth
                    onChange={(_, newMode) => newMode && setMode(newMode)}
                >
                    <ToggleButton value="login">Login</ToggleButton>
                    <ToggleButton value="register">Register</ToggleButton>
                </ToggleButtonGroup>

                {mode === 'register' && (
                    <TextField
                        label="Username"
                        fullWidth
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                )}

                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button variant="contained" fullWidth onClick={handleAuth}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </Button>
            </Box>
        </Container>
    );
}
