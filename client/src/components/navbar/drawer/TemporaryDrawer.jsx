import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';

function TemporaryDrawer({ open, onClose }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const CustomDrawer = styled(Drawer)(() => ({
    '& .MuiPaper-root': {
      backgroundColor: 'black',
      color: 'white',
    },
    '& .MuiListItemButton-root': {
      color: 'white',
    },
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '& .MuiDivider-root': {
      backgroundColor: 'white',
      borderColor: 'white',
    },
  }));
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ color: 'white' }}
            component={Link}
            to="/"
          >
            <ListItemIcon sx={{ color: 'white' }}><HomeOutlinedIcon /><Typography sx={{ ml: '6px' }}>Home</Typography></ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ color: 'white' }}
            component={Link}
            to="/furniture"
          >
            <ListItemIcon sx={{ color: 'white' }}><GridOnOutlinedIcon /><Typography sx={{ ml: '6px' }}>Catalog</Typography></ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: 'white', borderColor: 'white' }} />
      {isAuthenticated && (
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ color: 'white' }}
                component={Link}
                to="/furniture/liked"
              >
                <ListItemIcon sx={{ color: 'white' }}><FavoriteBorderIcon /><Typography sx={{ ml: '6px' }}>Liked Furniture</Typography></ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ color: 'white' }}
                component={Link}
                to="/furniture/create"
              >
                <ListItemIcon sx={{ color: 'white' }}><AddCircleOutlineOutlinedIcon /><Typography sx={{ ml: '6px' }}>Add Furniture</Typography></ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ backgroundColor: 'white', borderColor: 'white' }} />
        </Box>
      )}

      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ color: 'white' }}
            component={Link}
            to="/about-us"
          >
            <ListItemIcon sx={{ color: 'white' }}><InfoOutlinedIcon /><Typography sx={{ ml: '6px' }}>About Us</Typography></ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ color: 'white' }}
            component={Link}
            to="/contact"
          >
            <ListItemIcon sx={{ color: 'white' }}><ContactPhoneOutlinedIcon /><Typography sx={{ ml: '6px' }}>Contact Us</Typography></ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      anchor="left"
    >
      {DrawerList}
    </CustomDrawer>
  );
}

TemporaryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TemporaryDrawer;
