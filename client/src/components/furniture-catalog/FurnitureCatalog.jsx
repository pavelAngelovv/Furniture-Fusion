import useFetchFurnitureItems from '../../hooks/useFetchFurnitureItems';
import FurnitureCatalogBase from './FurnitureCatalogBase';
import { useState } from 'react';

const FurnitureCatalog = () => {
    const { furnitureItems, loading } = useFetchFurnitureItems();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
console.log(loading);
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
            loading={loading}
            error={loading}
            title="No furniture uploaded :("
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
