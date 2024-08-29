// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios.post('/api/token/', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.access);
            })
            .catch(error => console.error(error));
    };

    return (
        <form>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleSubmit}>Login</Button>
        </form>
    );
};

export default Login;
