import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/furniture';

export const getFurnitureItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFurnitureItemById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getRecentItems = async () => {
  try {
      const response = await axios.get(`${API_URL}?sortBy=_createdOn%20desc`);
      return response.data;
  } catch (error) {
      console.error('Failed to fetch recent posts:', error);
      throw error;
  }
};

export const createFurnitureItem = async (data) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'X-Authorization': token,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(`${API_URL}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating furniture item:', error);
    throw error;
  }
};

export const updateFurnitureItem = async (id, data) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'X-Authorization': token,
    'Content-Type': 'application/json'
  };

  const response = await axios.put(`${API_URL}/${id}`, data, { headers });
  return response.data;
};

export const deleteFurnitureItem = async (id) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'X-Authorization': token,
    'Content-Type': 'application/json'
  };
  
  const response = await axios.delete(`${API_URL}/${id}`, { headers });
  return response.data;
};
