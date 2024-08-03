import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Pagination, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FurnitureCatalogCard from './furniture-catalog-card/FurnitureCatalogCard';
import { fetchFurnitureItems } from '../../slices/furnitureSlice';
import { CATEGORIES, MATERIALS } from '../../utils/utils';

const FurnitureCatalog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { items: furnitureItems, status } = useSelector((state) => state.furniture);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFurnitureItems());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchFurnitureItems());
  }, [dispatch, location]);

  const filteredItems = useMemo(() => {
    return furnitureItems.filter(item => {
      const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesMaterial = selectedMaterial ? item.material === selectedMaterial : true;
      return matchesSearchQuery && matchesCategory && matchesMaterial;
    });
  }, [furnitureItems, searchQuery, selectedCategory, selectedMaterial]);

  const totalPages = useMemo(() => Math.ceil(filteredItems.length / itemsPerPage), [filteredItems.length, itemsPerPage]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredItems]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading furniture items.</p>;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page on a new filter
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
    setCurrentPage(1); // Reset to the first page on a new filter
  };

  return (
    <Container sx={{ marginTop: { xs: '20%', sm: '17%', md: '8%' }, mb: '3rem' }}>
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
    </Container>
  );
};

export default FurnitureCatalog;
