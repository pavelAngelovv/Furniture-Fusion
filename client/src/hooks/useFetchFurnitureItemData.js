import { useState, useEffect } from 'react';
import { getFurnitureItemById } from '../services/furnitureService';

const useFetchFurnitureItemData = (furnitureId) => {
    const [furniture, setFurniture] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFurnitureItemById(furnitureId);
                setFurniture(data);

                // Fetch location coordinates
                const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(data.ownerData.location)}&apiKey=356aca8cace74bb6808de9646c2d3861`);
                const locationData = await response.json();
                if (locationData.features.length > 0) {
                    const { lat, lon } = locationData.features[0].properties;
                    setLocation({ lat, lon });
                }
            } catch (error) {
                setError(error);
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [furnitureId]);

    return { furniture, location, error };
};

export default useFetchFurnitureItemData;
