import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Pagination } from '@mui/material';
import FurnitureCatalogCard from './furniture-catalog-card/FurnitureCatalogCard';
import { fetchFurnitureItems } from '../../slices/furnitureSlice';

const FurnitureCatalog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { items: furnitureItems, status } = useSelector((state) => state.furniture);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFurnitureItems());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchFurnitureItems());
  }, [dispatch, location]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading furniture items.</p>;

  // Calculate total pages
  const totalPages = Math.ceil(furnitureItems.length / itemsPerPage);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = furnitureItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ marginTop: { xs: '20%', sm: '17%', md: '8%' }, mb: '3rem' }}>
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
