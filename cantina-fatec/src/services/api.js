import axios from 'axios';

const api = axios.create({
  baseURL: /*'https://fateclanchesback-0erx.onrender.com',*/'https://fateclanchesback.onrender.com',
  timeout: 10000,
});

export default api;