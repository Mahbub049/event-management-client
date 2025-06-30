import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://event-management-server-0vmp.onrender.com',
  withCredentials: true
});

export default instance;
