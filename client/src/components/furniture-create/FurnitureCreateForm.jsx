// src/components/CreateFurnitureForm.jsx
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createFurnitureItem } from '../../services/furnitureService'; // Updated import

const CreateFurnitureForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await createFurnitureItem(data); // Use the service function
            console.log('Furniture item created successfully:', response);
            navigate('/furniture');
        } catch (error) {
            if (error.response) {
                console.error('Creation failed:', error.response.data);
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
                Create Furniture Item
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                id="title"
                label="Title"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="description"
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="price"
                label="Price"
                type="number"
                {...register('price', { required: 'Price is required', valueAsNumber: true })}
                error={!!errors.price}
                helperText={errors.price?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="category"
                label="Category"
                {...register('category', { required: 'Category is required' })}
                error={!!errors.category}
                helperText={errors.category?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="material"
                label="Material"
                {...register('material', { required: 'Material is required' })}
                error={!!errors.material}
                helperText={errors.material?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="weight"
                label="Weight (kg)"
                type="number"
                {...register('weight', { required: 'Weight is required', valueAsNumber: true })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="dimensions"
                label="Dimensions (L x W x H) cm"
                {...register('dimensions', { required: 'Dimensions are required' })}
                error={!!errors.dimensions}
                helperText={errors.dimensions?.message}
            />

            <TextField
                fullWidth
                margin="normal"
                id="image"
                label="Image URL"
                {...register('image', { required: 'Image URL is required' })}
                error={!!errors.image}
                helperText={errors.image?.message}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/furniture')}
                >
                    Cancel
                </Button>
            </Box>
        </Box >
    );
};

export default CreateFurnitureForm;
