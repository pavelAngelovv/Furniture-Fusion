import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/users/login', data);
            const { accessToken, firstName } = response.data;
            dispatch(login({ token: accessToken, firstName }));
            navigate('/');
        } catch (error) {
            if (error.response) {
                setLoginError(error.response.data.message || 'Login failed');
                console.error('Login failed:', error.response.data);
            } else if (error.request) {
                setLoginError('No response received from the server');
                console.error('No response received:', error.request);
            } else {
                setLoginError(error.message);
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 500,
                margin: '0 auto',
                p: 3,
                borderRadius: 2,
                boxShadow: 3
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>

            {loginError && (
                <Typography color="error" gutterBottom>
                    {loginError}
                </Typography>
            )}

            {/* Email */}
            <TextField
                fullWidth
                margin="normal"
                id="email"
                label="Email"
                type="email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Email is not valid',
                    },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            {/* Password */}
            <TextField
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                type="password"
                {...register('password', {
                    required: 'Password is required',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
                <Typography variant="body2">
                    Don&apos;t have an account? Click <Link to={'/register'}>here</Link> to register.
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;
