import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import TemporaryDrawer from './drawer/TemporaryDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import styles from '../../styles/navbar.module.css';

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const firstName = useSelector(state => state.auth.firstName);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

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

    const handleLogout = () => {
        handleMenuClose();
        dispatch(logout());
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
                <MenuItem key="logout" onClick={handleLogout}>
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
            <AppBar sx={{ backgroundColor: 'black' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            component="a"
                            href="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mr: isLoginPage || isRegisterPage ? "3rem" : 0
                              }}
                        >
                            <img src='../../public/images/Furniture-Fusion-Text-White.png' alt="Logo" className={styles['logo-img']} />
                        </IconButton>
                        {!isSmallScreen && (
                            <Box sx={{ ml: '2rem' }}>
                                <Button sx={{ color: 'white' }} component={Link} to="/about-us">
                                    About us
                                </Button>
                                <Button sx={{ color: 'white' }} component={Link} to="/furniture">
                                    Catalog
                                </Button>
                            </Box>
                        )}
                        {!isSmallScreen && isAuthenticated && (
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: '1rem' }}>
                                <IconButton
                                    size='small'
                                    component={Link}
                                    to={'/furniture/liked'}
                                    sx={{ color: 'white', ":hover": { backgroundColor: 'inherit' } }}
                                    aria-label="liked furniture"
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <Button
                                    size='small'
                                    component={Link}
                                    to={'/furniture/create'}
                                    sx={{
                                        color: 'black',
                                        outline: 1,
                                        ml: '2rem',
                                        backgroundColor: 'white',
                                        ":hover": { backgroundColor: 'inherit' },
                                    }}
                                    aria-label="add furniture"
                                >
                                    <AddCircleOutlineOutlinedIcon />
                                    <Typography sx={{ fontWeight: 700, p: '2px' }}> Add Furniture</Typography>
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated && !isSmallScreen ? (
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ position: 'relative', p: 1, width: 'auto' }}
                            >
                                <Typography sx={{ mr: 2, color: 'inherit', whiteSpace: 'nowrap' }}>
                                    Hello, {firstName}
                                </Typography>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color='inherit'
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                        ) : !isLoginPage && !isRegisterPage && (
                            <>
                                {isSmallScreen && isAuthenticated && (
                                    <Box sx={{ ml: 'auto' }}>
                                        <IconButton
                                            size='small'
                                            component={Link}
                                            to={'/furniture/liked'}
                                            sx={{ color: 'white', ":hover": { backgroundColor: 'inherit' } }}
                                            aria-label="liked furniture"
                                        >
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color='inherit'
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
