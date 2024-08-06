import { useEffect, useState } from 'react';
import { getFurnitureItemById } from '../../services/furnitureService';
import FurnitureCatalogBase from '../furniture-catalog/FurnitureCatalogBase';

const FurnitureLiked = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const likedItemIds = JSON.parse(localStorage.getItem('likedItems')) || [];
                const validLikedItemIds = likedItemIds.filter(id => id);
                const items = await Promise.all(validLikedItemIds.map(id => getFurnitureItemById(id)));
                setLikedItems(items);
            } catch (error) {
                console.error('Error fetching liked items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedItems();
    }, []);

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
            items={likedItems}
            loading={loading}
            error={false} // Since we're not handling specific errors here, this is set to false
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

export default FurnitureLiked;
