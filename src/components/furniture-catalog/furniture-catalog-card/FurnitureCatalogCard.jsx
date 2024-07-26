import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FurnitureCatalogCard = ({ item }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="240"
        image={item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/furniture/${item._id}`}>
          View Details
        </Button>
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
