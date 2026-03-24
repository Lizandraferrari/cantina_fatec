import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fateclanchesback-0erx.onrender.com/', 
});

export default api;