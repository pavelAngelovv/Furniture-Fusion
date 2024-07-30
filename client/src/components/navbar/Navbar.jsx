import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import TemporaryDrawer from './drawer/TemporaryDrawer';
import useAuth from '../../hooks/useAuth';
import styles from '../../../public/styles/navbar.module.css';  // Ensure the filename is correct

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const location = useLocation();
    const theme = useTheme();
    const { isAuthenticated, logout } = useAuth();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAuthenticated ? [
                <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
                    Profile
                </MenuItem>,
                <MenuItem key="logout" onClick={() => {
                    handleMenuClose();
                    logout(); // Call the logout function
                }}>
                    Logout
                </MenuItem>
            ] : [
                <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
                    Login
                </MenuItem>,
                <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
                    Register
                </MenuItem>
            ]}
        </Menu>
    );

    return (
        <Box className={styles.navbar}>
            <AppBar className={styles['app-bar']}>
                <Toolbar sx={{ display: 'flex', justifyContent: isSmallScreen ? 'center' : 'space-between' }}>
                    {isSmallScreen && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ marginRight: theme.spacing(2) }}
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} />
                        </Box>
                    )}
                    <Box className={styles['logo-container']}>
                        <IconButton
                            component="a"
                            href="/"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <img src='../../../public/images/Furniture-Fusion-text.png' alt="Logo" className={styles['logo-img']} />
                        </IconButton>
                        {!isSmallScreen && (
                        <Box sx={{ ml: '2rem', mt: '5px' }}>
                            <Button sx={{ color: 'white' }} component={Link} to="/catalog">
                                Catalog
                            </Button>
                            <Button sx={{ color: 'white' }} component={Link} to="/about-us">
                                About us
                            </Button>
                        </Box>
                        )}
                    </Box>
                        <Box>
                            {isAuthenticated ? (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ position: 'relative', p: 1 }}
                                >
                                    <Box sx={{ mr: 2, color: 'black' }}>
                                        Hello {firstName} {lastName}
                                    </Box>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Box>
                            ) : !isLoginPage && !isRegisterPage && (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                            )}
                        </Box>
                    
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
