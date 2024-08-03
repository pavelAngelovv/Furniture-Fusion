import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFurnitureById, updateFurniture } from '../../slices/furnitureSlice';
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

const FurnitureEditForm = () => {
  const { id } = useParams();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      material: '',
      category: '',
      image: '',
      price: '',
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      }
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.furniture);

  useEffect(() => {
    dispatch(fetchFurnitureById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (item) {
      setValue('title', item.title);
      setValue('description', item.description);
      setValue('material', item.material);
      setValue('category', item.category);
      setValue('image', item.image);
      setValue('price', item.price);
      setValue('weight', item.weight);
      setValue('dimensions.length', item.dimensions.length);
      setValue('dimensions.width', item.dimensions.width);
      setValue('dimensions.height', item.dimensions.height);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    try {
      const user = { firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', email: 'john.doe@example.com' };
      const formattedData = {
        ...data,
        dimensions: {
          length: parseFloat(data.dimensions.length),
          width: parseFloat(data.dimensions.width),
          height: parseFloat(data.dimensions.height)
        },
        ownerData: {
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email
        }
      };
      await dispatch(updateFurniture({ id, data: formattedData }));
      navigate(`/furniture/${id}`);
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

    const getNestedError = (name) => {
        const parts = name.split('.');
        return parts.length === 2
            ? errors[parts[0]]?.[parts[1]]
            : errors[name];
    };

    const renderTextField = (name, label, type = 'text', rules, maxLength = 255, multiline = false, rows = 1) => {
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
                        inputProps={{ maxLength }}
                        InputProps={{ inputProps: { min: 0 } }}
                        multiline={multiline}
                        rows={rows}
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
                Edit Furniture Item
            </Typography>

            {renderTextField(
                'title',
                'Title',
                'text',
                {
                    required: 'Title is required',
                    maxLength: { value: 30, message: 'Title cannot exceed 30 characters' }
                }
            )}
            {renderTextField(
                'description',
                'Description',
                'text',
                {
                    required: 'Description is required',
                    maxLength: { value: 250, message: 'Description cannot exceed 250 characters' }
                },
                undefined,
                true,
                4
            )}

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {renderTextField(
                        'price',
                        'Price',
                        'number',
                        {
                            required: 'Price is required',
                            pattern: {
                                value: /^\d+(\.\d{1,2})?$/,
                                message: 'Price must be a valid number with up to 2 decimal places'
                            },
                            maxLength: { value: 7, message: 'Price cannot exceed 7 characters' }
                        }
                    )}
                </Grid>
                <Grid item xs={6}>
                    {renderTextField(
                        'weight',
                        'Weight (kg)',
                        'number',
                        {
                            required: 'Weight is required',
                            maxLength: { value: 7, message: 'Weight cannot exceed 7 characters' }
                        }
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {renderSelectField(
                        'material',
                        'Material',
                        MATERIALS,
                        { required: 'Material is required' }
                    )}
                </Grid>
                <Grid item xs={6}>
                    {renderSelectField(
                        'category',
                        'Category',
                        CATEGORIES,
                        { required: 'Category is required' }
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {renderTextField(
                        'dimensions.length',
                        'Length (cm)',
                        'number',
                        {
                            required: 'Length is required',
                            min: { value: 0, message: 'Length must be a positive number' },
                            maxLength: { value: 5, message: 'Length cannot exceed 5 characters' }
                        }
                    )}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField(
                        'dimensions.width',
                        'Width (cm)',
                        'number',
                        {
                            required: 'Width is required',
                            min: { value: 0, message: 'Width must be a positive number' },
                            maxLength: { value: 5, message: 'Width cannot exceed 5 characters' }
                        }
                    )}
                </Grid>
                <Grid item xs={4}>
                    {renderTextField(
                        'dimensions.height',
                        'Height (cm)',
                        'number',
                        {
                            required: 'Height is required',
                            min: { value: 0, message: 'Height must be a positive number' },
                            maxLength: { value: 5, message: 'Height cannot exceed 5 characters' }
                        }
                    )}
                </Grid>
            </Grid>

            {renderTextField(
                'image',
                'Image URL',
                'text',
                { required: 'Image URL is required' }
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Update
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/furniture/${id}`)}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default FurnitureEditForm;
