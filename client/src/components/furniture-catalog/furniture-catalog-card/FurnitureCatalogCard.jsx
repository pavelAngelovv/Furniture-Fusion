import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const FurnitureCatalogCard = ({ item }) => {
  const [liked, setLiked] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    checkIfLiked(item._id);
  }, [item._id]);

  const checkIfLiked = (itemId) => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    setLiked(likedItems.includes(itemId));
  };

  const toggleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    if (likedItems.includes(item._id)) {
      const updatedLikedItems = likedItems.filter(id => id !== item._id);
      localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
      setLiked(false);
    } else {
      likedItems.push(item._id);
      localStorage.setItem('likedItems', JSON.stringify(likedItems));
      setLiked(true);
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="350"
        image={item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'  // Ensures it applies to the full width of the parent container
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'  // Ensures it applies to the full width of the parent container
          }}
        >
          {item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" component={Link} to={`/furniture/${item._id}`}>
          View Details
        </Button>
        {isAuthenticated && (
          <IconButton
            variant="contained"
            color={liked ? 'error' : 'default'}
            onClick={toggleLike}
            sx={{ marginLeft: 'auto' }}
          >
            {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

FurnitureCatalogCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default FurnitureCatalogCard;
