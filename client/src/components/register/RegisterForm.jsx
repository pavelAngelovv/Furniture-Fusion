import { useForm } from 'react-hook-form';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/users/register', data);
            const { accessToken, firstName } = response.data;
            dispatch(login({ token: accessToken, firstName }));
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            alert(error.response?.data.message);
        }
    };

    const password = watch('password');

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

            <TextField
                fullWidth
                margin="normal"
                id="firstName"
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="lastName"
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
            />

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
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                    },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number must be 10 digits',
                    },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{mr: '30px'}}
                >
                    Register
                </Button>
                <Typography variant="body2">
                    Already have an account? Click <Link to={'/login'}>here</Link> to log in.
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterForm;
