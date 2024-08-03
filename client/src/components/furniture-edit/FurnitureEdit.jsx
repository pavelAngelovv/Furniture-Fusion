import Box from '@mui/material/Box';
import FurnitureEditForm from './FurnitureEditForm';

const FurnitureEdit = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(../../../public/images/about-us-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: 4,
                mt: '3.5rem'
            }}
        >
            <FurnitureEditForm />
        </Box>
    );
};

export default FurnitureEdit;
