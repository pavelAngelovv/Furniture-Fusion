import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentFurniture } from '../../slices/furnitureSlice';
import AwesomeSlider from 'react-awesome-slider';
import { useMediaQuery, useTheme } from '@mui/material';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import styles from '../../../public/styles/home.module.css';

// Utility function to chunk array into groups of n
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Home = () => {
  const dispatch = useDispatch();
  const recentPosts = useSelector((state) => state.furniture.recentItems);
  const loading = useSelector((state) => state.furniture.loading);
  const error = useSelector((state) => state.furniture.error);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(fetchRecentFurniture());
  }, [dispatch]);

  // Chunk posts into groups of 3
  const groupedPosts = chunkArray(recentPosts, isSmallScreen ? 1 : 3);

  const handleCardClick = (id) => {
    navigate(`/furniture/${id}`);
  };

  return (
    <Box
      sx={{
        ml: 'auto',
        mr: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '3rem',
        height: '110%'
      }}
    >
      <Grid container spacing={2} sx={{ mb: '2rem', width: '80%' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src='/images/Furniture-Fusion-logo.png'
            alt="Logo"
            style={{ height: '320px', width: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" align="center" sx={{ px: 2, fontFamily: '"Snell Roundhand", cursive', fontWeight: 'bold' }}>
            Welcome to Furniture Fusion! Discover the best furniture for your home.
          </Typography>
        </Grid>
      </Grid>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && groupedPosts.length > 0 && (
        <Box sx={{ width: '95%', pb: '2rem' }}>
          <AwesomeSlider animation="cubeAnimation" bullets={false} cssModule={styles}>
            {groupedPosts.map((chunk, index) => (
              <div key={index} className={styles.slide}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'space-between' }, flexWrap: 'nowrap', ml: '3rem', mr: '3rem' }}>
                  {chunk.map((post) => (
                    <Card
                      key={post._id}
                      sx={{
                        flex: '1 1 30%',
                        minWidth: '200px',
                        height: 'auto',
                        margin: '8px',
                      }}
                    >
                      <CardActionArea sx={{ height: '100%' }} onClick={() => handleCardClick(post._id)}>
                        <CardMedia
                          component="img"
                          height="290"
                          image={post.image}
                          alt={post.title}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography gutterBottom variant="h6" component="div">
                            {post.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                            {post.description}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            ${post.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Box>
              </div>
            ))}
          </AwesomeSlider>
        </Box>
      )}
    </Box>
  );
};

export default Home;
