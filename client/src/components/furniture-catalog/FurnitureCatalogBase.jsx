import PropTypes from 'prop-types';
import { Grid, Container, Pagination, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FurnitureCatalogCard from './furniture-catalog-card/FurnitureCatalogCard';
import usePagination from '../../hooks/usePagination';
import useFurnitureFilters from '../../hooks/useFurnitureFilters';

const FurnitureCatalogBase = ({ items, loading, error, title, onSearchChange, onCategoryChange, onMaterialChange, selectedCategory, selectedMaterial, searchQuery }) => {
    const { filteredItems, CATEGORIES, MATERIALS } = useFurnitureFilters(items, searchQuery, selectedCategory, selectedMaterial);
    const { currentPage, totalPages, currentItems, handlePageChange } = usePagination(filteredItems);

    if (loading) return (
        <Box
            sx={{
                ml: 'auto',
                mr: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '20rem'
            }}
        >
            <CircularProgress size={'5rem'} />
        </Box>
    );

    if (error) return <p>Error loading items.</p>;

    return (
        <Container sx={{ marginTop: { xs: '20%', sm: '17%', md: '10%' }, mb: '3rem' }}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={onSearchChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ marginY: '-7px' }}>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={onCategoryChange}
                            label="Category"
                            size="small"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {CATEGORIES.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ marginY: '-7px' }}>Material</InputLabel>
                        <Select
                            value={selectedMaterial}
                            onChange={onMaterialChange}
                            label="Material"
                            size="small"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {MATERIALS.map((material) => (
                                <MenuItem key={material} value={material}>
                                    {material}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {filteredItems.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '40vh'
                    }}
                >
                    <Typography variant="h6" align="center">
                        {title}
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {currentItems.map((item) => (
                            <Grid item key={item._id} xs={12} sm={6} md={4}>
                                <FurnitureCatalogCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                    />
                </>
            )}
        </Container>
    );
};

FurnitureCatalogBase.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        category: PropTypes.string,
        material: PropTypes.string
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onMaterialChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedMaterial: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired
};

export default FurnitureCatalogBase;
