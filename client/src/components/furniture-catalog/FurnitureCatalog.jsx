import useFetchFurnitureItems from '../../hooks/useFetchFurnitureItems';
import FurnitureCatalogBase from './FurnitureCatalogBase';
import { useState } from 'react';

const FurnitureCatalog = () => {
    const { furnitureItems, status } = useFetchFurnitureItems();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleMaterialChange = (event) => {
        setSelectedMaterial(event.target.value);
    };

    return (
        <FurnitureCatalogBase
            items={furnitureItems}
            loading={status === 'loading'}
            error={status === 'failed'}
            title="You have no liked items yet."
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onMaterialChange={handleMaterialChange}
            selectedCategory={selectedCategory}
            selectedMaterial={selectedMaterial}
            searchQuery={searchQuery}
        />
    );
};

export default FurnitureCatalog;
