import Box from '@mui/material/Box';
import FurnitureCreateForm from './FurnitureCreateForm';

const FurnitureCreate = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: 4,
                mt: '3.5rem'
            }}
        >
            <FurnitureCreateForm />
        </Box>
    );
};

export default FurnitureCreate;
