import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fateclanchesback-0erx.onrender.com',/*'http://192.168.15.4:3000',*/
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;