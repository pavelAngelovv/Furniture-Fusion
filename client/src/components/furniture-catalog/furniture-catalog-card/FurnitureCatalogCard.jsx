import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';

const FurnitureCatalogCard = ({ item }) => {
  const [liked, setLiked] = useState(false);

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

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  };

  const maxDescriptionLength = 49;

  return (
    <Card>
      <CardMedia
        component="img"
        height="350"
        image={item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(item.description, maxDescriptionLength)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button size="small" component={Link} to={`/furniture/${item._id}`}>
          View Details
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          variant="contained"
          color={liked ? 'error' : 'default'}
          onClick={toggleLike}
          sx={{ marginLeft: 'auto' }}
        >
          {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
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
