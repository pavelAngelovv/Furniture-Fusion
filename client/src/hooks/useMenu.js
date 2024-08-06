import { useState } from 'react';

const useMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return { anchorEl, handleMenuClick, handleMenuClose };
};

export default useMenu;
