// src/services/furnitureService.js
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

export const createFurnitureItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateFurnitureItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteFurnitureItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
