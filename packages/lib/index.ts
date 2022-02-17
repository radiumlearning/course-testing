import axios from 'axios';

export const API_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
