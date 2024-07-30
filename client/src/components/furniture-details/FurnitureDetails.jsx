import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getFurnitureItemById } from '../../services/furnitureService';

const FurnitureDetails = () => {
    const { id: furnitureId } = useParams();
    const [furniture, setFurniture] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFurnitureItemById(furnitureId);
                setFurniture(data);
                checkIfLiked(data._id);
            } catch (error) {
                console.error('Error fetching furniture item', error);
            }
        };

        fetchData();
    }, [furnitureId]);

    const checkIfLiked = (itemId) => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLiked(likedItems.includes(itemId));
    };

    const toggleLike = () => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

        if (likedItems.includes(furnitureId)) {
            const updatedLikedItems = likedItems.filter(item => item !== furnitureId);
            localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
            setLiked(false);
        } else {
            likedItems.push(furnitureId);
            localStorage.setItem('likedItems', JSON.stringify(likedItems));
            setLiked(true);
        }
    };

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
                        <Typography variant="h4" component="div" sx={{ fontWeight: '700', mb: '10px' }}>
                            {furniture.title}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mb: '30px', fontWeight: '5', fontSize: '27px' }}>
                            ${furniture.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: '50px', fontSize: '17px' }}>
                            {furniture.description}
                        </Typography>

                        <Grid container spacing={2} sx={{ ml: {xs: '-60px', sm: '-30px', md: '-70px'}, mb: '3rem' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', ':focus': 'outline' }}>
                            <IconButton
                                variant="contained"
                                color={liked ? 'error' : 'info'}
                                onClick={toggleLike}
                            >
                                {liked ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />}
                            </IconButton>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
};

export default FurnitureDetails;
