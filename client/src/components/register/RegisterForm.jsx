import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { register } from '../../slices/authSlice'; // Import the register thunk
import useLocationAutocomplete from '../../hooks/useLocationAutocomplete';

const RegisterForm = () => {
    const { register: formRegister, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiKey = '356aca8cace74bb6808de9646c2d3861';

    const { locationOptions, fetchLocationSuggestions } = useLocationAutocomplete(apiKey);

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(register(data));

            if (register.fulfilled.match(resultAction)) {
                navigate('/');
            } else {
                console.error('Registration failed:', resultAction.payload);
                alert(resultAction.payload);
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            alert(error.message);
        }
    };

    const handleLocationChange = (event, value) => {
        fetchLocationSuggestions(value);
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

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="firstName"
                        label="First Name"
                        {...formRegister('firstName', { required: 'First name is required' })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="lastName"
                        label="Last Name"
                        {...formRegister('lastName', { required: 'Last name is required' })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        {...formRegister('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'Email is not valid',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        {...formRegister('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Phone number must be 10 digits',
                            },
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        freeSolo
                        options={locationOptions}
                        onInputChange={handleLocationChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                margin="normal"
                                id="location"
                                label="Location"
                                {...formRegister('location', { required: 'Location is required' })}
                                error={!!errors.location}
                                helperText={errors.location?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        {...formRegister('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        {...formRegister('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match',
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
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
