import { useState } from 'react';
import axios from 'axios';

const useLocationAutocomplete = (apiKey) => {
    const [locationOptions, setLocationOptions] = useState([]);

    const fetchLocationSuggestions = async (value) => {
        if (value) {
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${apiKey}`);
                setLocationOptions(response.data.features.map(place => place.properties.formatted));
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
        }
    };

    return { locationOptions, fetchLocationSuggestions };
};

export default useLocationAutocomplete;
