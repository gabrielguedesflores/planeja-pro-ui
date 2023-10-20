import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

axiosInstance.interceptors.request.use(config => {
  const session = JSON.parse(window.sessionStorage.getItem('session') || '{}');
  if (session && session.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log('logout'); // TODO: Melhorar processo de logout
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
