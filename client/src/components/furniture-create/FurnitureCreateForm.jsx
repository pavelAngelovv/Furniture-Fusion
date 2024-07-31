import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createFurnitureItem } from '../../services/furnitureService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const CATEGORIES = ["Seating", "Tables", "Storage", "Beds", "Office", "Decor"];
const MATERIALS = ["Wood", "Glass", "Leather", "Fabric"];

const CreateFurnitureForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            material: '',
            category: '',
            image: ''
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            dimensions: {
                length: parseFloat(data.dimensions.length),
                width: parseFloat(data.dimensions.width),
                height: parseFloat(data.dimensions.height)
            }
        };

        try {
            const response = await createFurnitureItem(formattedData);
            console.log('Furniture item created successfully:', response);
            navigate('/furniture');
        } catch (error) {
            console.error('Creation failed:', error.response?.data || error.message);
        }
    };

    const getNestedError = (name) => {
        const parts = name.split('.');
        return parts.length === 2
            ? errors[parts[0]]?.[parts[1]]
            : errors[name];
    };

    const renderTextField = (name, label, type = 'text', rules) => {
        const error = getNestedError(name);

        return (
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        margin="normal"
                        label={label}
                        type={type}
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        value={field.value || ''}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                    />
                )}
            />
        );
    };

    const renderSelectField = (name, label, options, rules) => (
        <FormControl fullWidth margin="normal" error={!!errors[name]}>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        label={label}
                        value={field.value || ''}
                    >
                        {options.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors[name] && (
                <Typography variant="body2" color="error">
                    {errors[name].message}
                </Typography>
            )}
        </FormControl>
    );

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 500,
                margin: '0 auto',
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Create Furniture Item
            </Typography>

            {renderTextField('title', 'Title', 'text', { required: 'Title is required' })}
            {renderTextField('description', 'Description', 'text', { required: 'Description is required' })}

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {renderTextField('price', 'Price', 'number', { required: 'Price is required' })}
                </Grid>
                <Grid item xs={6}>
                    {renderTextField('weight', 'Weight (kg)', 'number', { required: 'Weight is required' })}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {renderSelectField('material', 'Material', MATERIALS, { required: 'Material is required' })}
                </Grid>
                <Grid item xs={6}>
                    {renderSelectField('category', 'Category', CATEGORIES, { required: 'Category is required' })}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {renderTextField('dimensions.length', 'Length (cm)', 'number', {
                        required: 'Length is required',
                        min: { value: 0, message: 'Length must be a positive number' }
                    })}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('dimensions.width', 'Width (cm)', 'number', {
                        required: 'Width is required',
                        min: { value: 0, message: 'Width must be a positive number' }
                    })}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField('dimensions.height', 'Height (cm)', 'number', {
                        required: 'Height is required',
                        min: { value: 0, message: 'Height must be a positive number' }
                    })}
                </Grid>
            </Grid>

            {renderTextField('image', 'Image URL', 'text', { required: 'Image URL is required' })}

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
        </Box>
    );
};

export default CreateFurnitureForm;
