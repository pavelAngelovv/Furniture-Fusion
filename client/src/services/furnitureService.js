import axios from 'axios';

const API_URL = 'http://localhost:3030/data/furniture';

export const getFurnitureItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFurnitureItemById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const createFurnitureItem = async (data) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
      'X-Authorization': token,
      'Content-Type': 'application/json'
  };
  
  const response = await axios.post(`${API_URL}`, data, { headers });
  return response.data;
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
