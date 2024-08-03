import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container } from '@mui/material';
import FurnitureCatalogCard from './furniture-catalog-card/FurnitureCatalogCard';
import { fetchFurnitureItems } from '../../slices/furnitureSlice';

const FurnitureCatalog = () => {
  const dispatch = useDispatch();
  const { items: furnitureItems, status } = useSelector((state) => state.furniture);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFurnitureItems());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading furniture items.</p>;

  return (
    <Container sx={{marginTop: {xs: '20%', sm: '17%', md: '8%'}, mb: '3rem'}}>
      <Grid container spacing={4}>
        {furnitureItems.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <FurnitureCatalogCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FurnitureCatalog;
