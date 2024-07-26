import { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import FurnitureCatalogCard from './furniture-catalog-card/FurnitureCatalogCard';
import { getFurnitureItems } from '../../services/furnitureService';

const FurnitureCatalog = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    fetchFurnitureItems();
  }, []);

  const fetchFurnitureItems = async () => {
    try {
      const items = await getFurnitureItems();
      setFurnitureItems(items);
    } catch (error) {
      console.error('Error fetching furniture items', error);
    }
  };

  return (
    <Container sx={{marginTop: '8%'}}>
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
