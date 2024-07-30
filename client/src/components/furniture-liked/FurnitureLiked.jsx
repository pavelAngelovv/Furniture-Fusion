import { useEffect, useState } from 'react';
import { Container, Grid, Box, CircularProgress } from '@mui/material';
import { getFurnitureItemById } from '../../services/furnitureService';
import FurnitureCatalogCard from '../furniture-catalog/furniture-catalog-card/FurnitureCatalogCard';

const FurnitureLiked = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const likedItemIds = JSON.parse(localStorage.getItem('likedItems')) || [];
                const items = await Promise.all(likedItemIds.map(id => getFurnitureItemById(id)));
                setLikedItems(items);
            } catch (error) {
                console.error('Error fetching liked items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedItems();
    }, []);

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

    return (
        <Container sx={{ marginTop: { xs: '20%', sm: '17%', md: '8%' } }}>
            <Grid container spacing={4}>
                {likedItems.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                        <FurnitureCatalogCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FurnitureLiked;
