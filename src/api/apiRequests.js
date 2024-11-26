import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const initInterceptor = () => {
  apiRequest.interceptors.request.use(
    (config) => {
      config.headers = config.headers ?? {};
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config ?? {};

      switch (status) {
        case 401: {
          if (originalRequest.url === 'api/auth/login') {
            return Promise.reject(error);
          }
          // Call old request
          try {
            const res = await axios.request({
              ...originalRequest,
              headers: {}
            });

            return res;
          } catch (err) {
            return Promise.reject(err);
          }
        }
      }
    }
  );
};

export default apiRequest;