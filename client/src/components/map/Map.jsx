import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

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

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  })
};

export default Map;
