import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress, Rating, Box, Grid } from '@mui/material';
import { getFurnitureItemById } from '../../services/furnitureService';

const FurnitureDetails = () => {
    const { id } = useParams();
    const [furniture, setFurniture] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getFurnitureItemById(id);
                setFurniture(data);
            } catch (error) {
                console.error('Error fetching furniture item', error);
            }
        })();
    }, [id]);

    if (!furniture) return (
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
        <Container sx={{ mt: { xs: '7rem', sm: '5rem', md: '10rem' } }}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flex: 2.3, display: 'flex', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        alt={furniture.title}
                        sx={{
                            objectFit: 'contain',
                            width: '100%',
                            height: { xs: 300, sm: 600 }
                        }}
                        image={furniture.image}
                    />
                </Box>

                <Box sx={{ flex: 1, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '700', mb: 2 }}>
                            {furniture.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '17px' }}>
                            {furniture.description}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: '1000', fontSize: '27px' }}>
                            ${furniture.price}
                        </Typography>

                        <Grid container spacing={2} sx={{ ml: '-70px', mb: '3rem' }}>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='../../../public/images/categorization.png' alt="Category" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='../../../public/images/fabric.png' alt="Material" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.material}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='../../../public/images/weight.png' alt="Weight" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.weight} kg
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='../../../public/images/cube.png' alt="Dimensions" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.dimensions.length}cm x {furniture.dimensions.width}cm x {furniture.dimensions.height}cm
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex' }}>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                Add to Cart
                            </Button>
                            <Typography variant="body2" component="div" sx={{ mb: 4 }}>
                                <Rating name="half-rating" defaultValue={furniture.rating.rate} precision={0.1} />
                                {` (${furniture.rating.count})`}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
};

export default FurnitureDetails;
