
import { Box } from '@mui/material';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 4,
        mt: '7rem'
      }}
    >
      <RegisterForm />
    </Box>
  );
};

export default Register;
