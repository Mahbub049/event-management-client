import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://event-management-server-production.up.railway.app/',
  withCredentials: true
});

export default instance;
