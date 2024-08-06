import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../slices/userSlice';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import styles from '../../../public/styles/profile.module.css';
import Map from '../map/Map';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserDataWithLocation = async () => {
      dispatch(fetchUserData());

      if (user?.location) {
        try {
          const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(user.location)}&apiKey=356aca8cace74bb6808de9646c2d3861`);
          const locationData = await response.json();
          if (locationData.features.length > 0) {
            const { lat, lon } = locationData.features[0].properties;
            setLocation({ lat, lon });
          }
        } catch (error) {
          console.error('Error fetching location', error);
        }
      }
    };

    fetchUserDataWithLocation();
  }, [dispatch, user?.location]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className={styles.profileContainer}>
      <Box sx={{ marginBottom: '1.5rem' }}>
        <Avatar
          alt="User Avatar"
          className={styles.avatar}
        />
      </Box>
      {user ? (
        <Box className={styles.profileInfo}>
          <Typography variant="body1">{user.firstName} {user.lastName}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body1">{user.phoneNumber}</Typography>
          <Typography variant="body1">{user.location}</Typography>
          {location && <Map location={location} />}
        </Box>
      ) : (
        <Typography>No user data available</Typography>
      )}
    </Box>
  );
};

export default Profile;
