const VISIT_JEJU_BASE_URL = import.meta.env.VITE_VISIT_JEJU_BASE_URL;
const VISIT_JEJU_API_KEY = import.meta.env.VITE_VISITJEJU_KEY;
import axios from 'axios';

const jejuAPI = axios.create({
  baseURL: VISIT_JEJU_BASE_URL,
  timeout: 3000,
  params: {
    apiKey: VISIT_JEJU_API_KEY,
    locale: 'kr',
  },
});

export default jejuAPI;
