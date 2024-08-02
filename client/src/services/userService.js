// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/users/me'

export const getUserData = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token found');
    }

    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                'X-Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
