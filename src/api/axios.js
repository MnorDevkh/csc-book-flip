
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://csc-book-api.boeurnmnor.site',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
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

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            localStorage.removeItem('token');
            // router.push('/login'); // You might need a way to access router here or handle it in the component
        }
        return Promise.reject(error);
    }
);

export default api;
