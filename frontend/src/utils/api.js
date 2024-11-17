import axios from 'axios';

// Configuración de Axios
const instance = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 5000,
  withCredentials: true, 
});

export default instance;
