// RegisterForm.js
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    // Initialize useForm
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/users/register', data);
            const { accessToken } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            navigate('/')
            console.log('Registration successful:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Registration failed:', error.response.data);
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
                Register
            </Typography>

            {/* First Name */}
            <TextField
                fullWidth
                margin="normal"
                id="firstName"
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
            />

            {/* Last Name */}
            <TextField
                fullWidth
                margin="normal"
                id="lastName"
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
            />

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
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                    },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            {/* Confirm Password */}
            <TextField
                fullWidth
                margin="normal"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value, { password }) => value === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            {/* Phone Number */}
            <TextField
                fullWidth
                margin="normal"
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                        value: /^[0-9]{10}$/, // Adjust pattern as needed
                        message: 'Phone number must be 10 digits',
                    },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
