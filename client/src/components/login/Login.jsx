
import { Box } from '@mui/material';
import LoginForm from './LoginForm';

const Login = () => {
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
      <LoginForm />
    </Box>
  );
};

export default Login;
