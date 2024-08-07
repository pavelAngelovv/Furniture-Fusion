import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState('');

    const error = useSelector((state) => state.auth.error);

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(login(data));

            if (login.fulfilled.match(resultAction)) {
                navigate('/');
            } else {
                setLoginError(resultAction.payload || 'Login failed');
                console.error('Login failed:', resultAction.payload);
            }
        } catch (error) {
            setLoginError(error.message || 'An unexpected error occurred');
            console.error('Login error:', error.message);
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
                boxShadow: 3,
                backgroundColor: 'white'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            {loginError && (
                <Typography color="error" gutterBottom>
                    {loginError}
                </Typography>
            )}

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
                <Typography sx={{ ml: '40px', color: 'black' }} variant="body2">
                    Don&apos;t have an account? Click <Link to={'/register'}>here</Link> to register.
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;
