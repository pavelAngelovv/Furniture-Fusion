import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
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
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{ marginRight: theme.spacing(2) }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} />
                        {!isSmallScreen && (
                            <IconButton
                                component="a"
                                href="/"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <img src='../../../public/images/Furniture-Fusion-text.png' alt="Logo" style={{ height: '30px', width: 'auto' }} />
                            </IconButton>
                        )}
                        {isCatalogPage && (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        )}
                    </Box>
                    {isAuthenticated ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ position: 'relative', p: 1 }}
                        >
                            {!isSmallScreen && (
                                <Box sx={{ mr: 2, color: 'black' }}>
                                    Hello {firstName} {lastName}
                                </Box>
                            )}
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
                    ) : !isLoginPage && !isRegisterPage ? (
                        <Box>
                            <Button component={Link} to="/login">
                                Login
                            </Button>
                            <Button component={Link} to="/register">
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
