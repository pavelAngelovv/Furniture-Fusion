import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFurnitureItems } from '../slices/furnitureSlice';

const useFetchFurnitureItems = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { items: furnitureItems, loading } = useSelector((state) => state.furniture);

    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchFurnitureItems());
        }
    }, [dispatch, loading]);

    useEffect(() => {
        dispatch(fetchFurnitureItems());
    }, [dispatch, location]);

    return { furnitureItems, loading };
};

export default useFetchFurnitureItems;
