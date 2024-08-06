import { useState, useEffect } from 'react';

export const useLike = (furnitureId) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkIfLiked = () => {
            const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
            setLiked(likedItems.includes(furnitureId));
        };

        checkIfLiked();
    }, [furnitureId]);

    const toggleLike = () => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        if (likedItems.includes(furnitureId)) {
            const updatedLikedItems = likedItems.filter(item => item !== furnitureId);
            localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
            setLiked(false);
        } else {
            likedItems.push(furnitureId);
            localStorage.setItem('likedItems', JSON.stringify(likedItems));
            setLiked(true);
        }
    };

    return { liked, toggleLike };
};

export default useLike