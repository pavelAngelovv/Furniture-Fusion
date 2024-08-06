// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/users'

export const getUserData = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No access token found');
    }

    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                'X-Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error;
    }
};
