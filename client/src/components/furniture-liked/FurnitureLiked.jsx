import { useEffect, useState, useMemo } from 'react';
import { Container, Grid, Box, CircularProgress, Typography, Pagination, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getFurnitureItemById } from '../../services/furnitureService';
import FurnitureCatalogCard from '../furniture-catalog/furniture-catalog-card/FurnitureCatalogCard';
import { CATEGORIES, MATERIALS } from '../../utils/utils';

const FurnitureLiked = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const likedItemIds = JSON.parse(localStorage.getItem('likedItems')) || [];
                const validLikedItemIds = likedItemIds.filter(id => id);
                const items = await Promise.all(validLikedItemIds.map(id => getFurnitureItemById(id)));
                setLikedItems(items);
            } catch (error) {
                console.error('Error fetching liked items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedItems();
    }, []);

    const filteredItems = useMemo(() => {
        return likedItems.filter(item => {
            const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesMaterial = selectedMaterial ? item.material === selectedMaterial : true;
            return matchesSearchQuery && matchesCategory && matchesMaterial;
        });
    }, [likedItems, searchQuery, selectedCategory, selectedMaterial]);

    const totalPages = useMemo(() => Math.ceil(filteredItems.length / itemsPerPage), [filteredItems.length, itemsPerPage]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, itemsPerPage, filteredItems]);

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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const handleMaterialChange = (event) => {
        setSelectedMaterial(event.target.value);
        setCurrentPage(1);
    };

    return (
        <Container sx={{ marginTop: { xs: '20%', sm: '17%', md: '8%' } }}>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <FormControl fullWidth>
                        <InputLabel sx={{marginY: '-7px'}}>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
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
                        <InputLabel sx={{marginY: '-7px'}}>Material</InputLabel>
                        <Select
                            value={selectedMaterial}
                            onChange={handleMaterialChange}
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
                        You have no liked items yet.
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

export default FurnitureLiked;
