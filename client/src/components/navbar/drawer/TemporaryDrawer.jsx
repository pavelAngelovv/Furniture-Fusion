import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TemporaryDrawer({ open, onClose }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
          <ListItem disablePadding>
            <ListItemButton color="inherit" component={Link} to="/">
              <ListItemIcon>
              Home
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton color="inherit" component={Link} to="/furniture">
              <ListItemIcon>
              Catalog
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton  color="inherit" component={Link} to="/about">
              <ListItemIcon>
              About
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  color="inherit" component={Link} to="/contact">
              <ListItemIcon>
              Contact
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose} anchor="left">
      {DrawerList}
    </Drawer>
  );
}
TemporaryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TemporaryDrawer;
