import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import styles from '../../../public/styles/Navbar.module.css';
import TemporaryDrawer from './drawer/TemporaryDrawer';
import useAuth from '../../hooks/useAuth';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        [theme.breakpoints.down('sm')]: {
            width: '5ch',
        },
    },
}));

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
    const isCatalogPage = location.pathname === '/furniture';

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
            {isAuthenticated ? (
                <>
                    <MenuItem key="profile" component={Link} to="/profile" onClick={handleMenuClose}>
                        Profile
                    </MenuItem>
                    <MenuItem key="logout" onClick={() => {
                        handleMenuClose();
                        logout(); // Call the logout function
                    }}>
                        Logout
                    </MenuItem>
                </>
            ) : (
                <>
                    <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
                        Login
                    </MenuItem>
                    <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
                        Register
                    </MenuItem>
                </>
            )}
        </Menu>
    );

    return (
        <Box className={styles.navbar}>
            <AppBar className={styles['app-bar']}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ position: 'absolute', left: 16 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} />
                    <IconButton
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            left: 90,
                            display: 'flex',
                        }}
                    >
                        <img src='../../../public/images/Furniture-Fusion-text.png' alt="Logo" style={{ height: '30px', width: 'auto' }} />
                    </IconButton>
                    {isCatalogPage && (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            <div className={styles.search}>
                                <StyledInputBase
                                    placeholder={isSmallScreen ? '' : 'Search…'}
                                    inputProps={{ 'aria-label': 'search' }}
                                    className={styles['styled-input-base']}
                                />
                                <div className={styles['search-icon-wrapper']}>
                                    <SearchIcon />
                                </div>
                            </div>
                        </Box>
                    )}
                    {isAuthenticated ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ position: 'relative', p: 1 }}
                        >
                            <Box sx={{ mr: 2 }}>
                                Hello {firstName} {lastName}
                            </Box>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    ) : !isLoginPage && !isRegisterPage ? (
                        <Box>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </Box>
                    ) : null}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
