import { useEffect, useState } from 'react';
import { getUserData } from '../services/userService';

const useOwnership = (ownerId) => {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const checkIfOwner = async () => {
            try {
                const currentUser = await getUserData();
                setIsOwner(currentUser._id === ownerId);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        checkIfOwner();
    }, [ownerId]);

    return { isOwner };
};

export default useOwnership;