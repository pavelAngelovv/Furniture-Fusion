import { useMemo } from 'react';
import { CATEGORIES, MATERIALS } from '../utils/utils';

const useFurnitureFilters = (furnitureItems, searchQuery, selectedCategory, selectedMaterial) => {
    const filteredItems = useMemo(() => {
        return furnitureItems.filter(item => {
            const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesMaterial = selectedMaterial ? item.material === selectedMaterial : true;
            return matchesSearchQuery && matchesCategory && matchesMaterial;
        });
    }, [furnitureItems, searchQuery, selectedCategory, selectedMaterial]);

    return {
        filteredItems,
        CATEGORIES,
        MATERIALS
    };
};

export default useFurnitureFilters;
