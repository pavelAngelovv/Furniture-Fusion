// LoginForm.js
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth'; // Ensure correct import path

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth(); // Call useAuth as a function

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/users/login', data);
            const { accessToken } = response.data;
            login(accessToken); // Now login should be defined as a function
            console.log('Login successful:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
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

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
