import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AlertDialog from './dialog/AlertDialog';
import { getFurnitureItemById, deleteFurnitureItem } from '../../services/furnitureService';
import { getUserData } from '../../services/userService';

const FurnitureDetails = () => {
    const { id: furnitureId } = useParams();
    const [furniture, setFurniture] = useState(null);
    const [liked, setLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [location, setLocation] = useState(null);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFurnitureItemById(furnitureId);
                setFurniture(data);
                checkIfLiked(data._id);
                checkIfOwner(data._ownerId);

                // Fetch location coordinates
                const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(data.ownerData.location)}&apiKey=356aca8cace74bb6808de9646c2d3861`);
                const locationData = await response.json();
                if (locationData.features.length > 0) {
                    const { lat, lon } = locationData.features[0].properties;
                    setLocation({ lat, lon });
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [furnitureId]);

    const checkIfLiked = (itemId) => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLiked(likedItems.includes(itemId));
    };

    const checkIfOwner = async (ownerId) => {
        try {
            const currentUser = await getUserData();
            setIsOwner(currentUser._id === ownerId);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        navigate(`/furniture/edit/${furnitureId}`);
    };

    const handleDelete = async () => {
        try {
            await deleteFurnitureItem(furnitureId);
            console.log('Furniture item deleted successfully');
            navigate('/furniture');
        } catch (error) {
            console.error('Error deleting furniture item', error);
        } finally {
            setDialogOpen(false);
        }
    };

    const Map = ({ location }) => {
        if (!location) return null;

        return (
            <Box sx={{ mt: '2rem', height: '300px', width: '100%', position: 'relative' }}>
                <iframe
                    src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${location.lon},${location.lat}&zoom=12.7015&marker=lonlat:${location.lon},${location.lat};type:material;color:red;icon:cloud;iconsize:large&apiKey=356aca8cace74bb6808de9646c2d3861`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Location Map"
                ></iframe>
            </Box>
        );
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
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
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                width: '300px',
                                wordWrap: 'break-word',
                                fontWeight: '700',
                                mb: '30px'
                            }}
                        >
                            {furniture.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: '40px' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: '500',
                                    fontSize: '27px',
                                    mr: 'auto'
                                }}
                            >
                                ${furniture.price}
                            </Typography>
                            {isAuthenticated && !isOwner && (
                                <IconButton
                                    variant="contained"
                                    color={liked ? 'error' : 'info'}
                                    onClick={toggleLike}
                                >
                                    {liked ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />}
                                </IconButton>
                            )}
                            {isOwner && (
                                <>
                                    <IconButton
                                        aria-label="settings"
                                        onClick={handleMenuClick}
                                    >
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                        <MenuItem onClick={() => setDialogOpen(true)}>Delete</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            width='300px'
                            sx={{
                                mb: '50px',
                                wordWrap: 'break-word',
                                fontSize: '17px'
                            }}
                        >
                            {furniture.description}
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: '3rem' }}>
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

                        {/* Owner Data Section */}
                        <Box sx={{ mt: '2rem' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '10px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: '700' }}>
                                        Contact Owner
                                    </Typography>
                                    <Box sx={{ marginY: '5px', marginX: '8px' }}>
                                        <ConnectWithoutContactIcon />
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: '10px' }}>
                                {furniture.ownerData.firstName} {furniture.ownerData.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: '10px' }}>
                                {furniture.ownerData.phoneNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: '10px' }}>
                                {furniture.ownerData.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {furniture.ownerData.location}
                            </Typography>
                            {/* Add the Map Component */}
                            {location && <Map location={location} />}
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            <AlertDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
            />
        </Container>
    );
};

Map.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired
    })
};

export default FurnitureDetails;
