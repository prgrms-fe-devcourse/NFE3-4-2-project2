const DEV_SERVER_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

const devAPI = axios.create({
  baseURL: DEV_SERVER_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default devAPI;
