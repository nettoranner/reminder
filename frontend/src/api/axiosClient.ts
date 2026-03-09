import axios from 'axios';

const axiosClient = axios.create({

    baseURL: import.meta.env.VITE_API || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.error('No authorization.');
            } else if (status === 403) {
                console.error('No access to resource');
            } else if (status === 500) {
                console.error('Error server');
            }
        } else if (error.request) {
            console.error('Server dont response on request');
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
