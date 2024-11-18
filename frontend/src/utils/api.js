import axios from 'axios';

// Configuración de Axios
const instance = axios.create({
  baseURL: 'http://aplicacion:5000',
  timeout: 5000,
  withCredentials: true, // Asegúrate de que las cookies se envíen con las solicitudes
});

// Interceptor para agregar el token a cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;