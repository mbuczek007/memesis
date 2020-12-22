import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.memesis.pl',
});

/* export const deleteItemById = (id) => api.delete(`/item/${id}`);
 */
export const insertItem = (payload) => api.post(`/item`, payload);

export const getItemById = (id) => api.get(`/item/${id}`);
export const getItems = (mode, perPage, offset) =>
  api.get(`/items/${mode}/${perPage}/${offset}`);
export const getItemsCount = (mode) => api.get(`/count/items/${mode}`);

const apis = {
  insertItem,
  getItems,
  getItemsCount,
  getItemById,
  /*   deleteItemById,
  , */
};

export default apis;
