
import Box from '@mui/material/Box';
import FurnitureCreateForm from './FurnitureCreateForm';

const FurnitureCreate = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(../../../public/images/about-us-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: 4,
                mt: '4rem'
            }}
        >
            <FurnitureCreateForm />
        </Box>
    );
};

export default FurnitureCreate;
