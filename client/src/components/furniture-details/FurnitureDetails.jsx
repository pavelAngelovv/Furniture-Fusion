import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import useFetchFurnitureItemData from '../../hooks/useFetchFurnitureItemData';
import useLike from '../../hooks/useLike';
import useOwnership from '../../hooks/useOwnership';
import useMenu from '../../hooks/useMenu';
import useDialog from '../../hooks/useDialog';
import Map from '../map/Map';
import { deleteFurnitureItem } from '../../services/furnitureService';

const FurnitureDetails = () => {
    const { id: furnitureId } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const { furniture, location, error } = useFetchFurnitureItemData(furnitureId);
    const { liked, toggleLike } = useLike(furnitureId);
    const { isOwner } = useOwnership(furniture?._ownerId);
    const { anchorEl, handleMenuClick, handleMenuClose } = useMenu();
    const { dialogOpen, openDialog, closeDialog } = useDialog();

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
            closeDialog();
        }
    };

    if (error) {
        return <Typography color="error">Error loading furniture details</Typography>;
    }

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
                                    onClick={() => toggleLike()}
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
                                        <MenuItem onClick={openDialog}>Delete</MenuItem>
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
                                <img src='/images/categorization.png' alt="Category" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='/images/fabric.png' alt="Material" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.material}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='/images/weight.png' alt="Weight" style={{ height: '30px', width: 'auto' }} />
                                <Typography variant="body2" component="div" sx={{ mt: 1, textAlign: 'center' }}>
                                    {furniture.weight} kg
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src='..//images/cube.png' alt="Dimensions" style={{ height: '30px', width: 'auto' }} />
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
                            {/* Use the Map Component */}
                            {location && <Map location={location} />}
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            <AlertDialog
                open={dialogOpen}
                onClose={closeDialog}
                onConfirm={handleDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this item?"
            />
        </Container>
    );
};

export default FurnitureDetails;
