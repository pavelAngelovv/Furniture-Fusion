import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFurnitureItems } from '../slices/furnitureSlice';

const useFetchFurnitureItems = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { items: furnitureItems, status } = useSelector((state) => state.furniture);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFurnitureItems());
        }
    }, [dispatch, status]);

    useEffect(() => {
        dispatch(fetchFurnitureItems());
    }, [dispatch, location]);

    return { furnitureItems, status };
};

export default useFetchFurnitureItems;
