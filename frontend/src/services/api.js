import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mm_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiry handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and on admin page, remove expired token
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('mm_admin_token');
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const verifyAdminSession = () => api.get('/auth/me');

// Portfolio endpoints
export const getPortfolio = (category) =>
  api.get('/portfolio', { params: category ? { category } : {} });
export const getPortfolioItem = (id) => api.get(`/portfolio/${id}`);
export const createPortfolioItem = (data) => api.post('/portfolio', data);
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data);
export const deletePortfolioItem = (id) => api.delete(`/portfolio/${id}`);

// Gallery endpoints
export const getGallery = (category) =>
  api.get('/gallery', { params: category ? { category } : {} });
export const createGalleryItem = (data) => api.post('/gallery', data);
export const updateGalleryItem = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);

// Service endpoints
export const getServices = (all = false) =>
  api.get('/services', { params: all ? { all: 'true' } : {} });
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Inquiry endpoints
export const submitInquiry = (data) => api.post('/inquiries', data);
export const getInquiries = (params) => api.get('/inquiries', { params });
export const updateInquiryStatus = (id, status) =>
  api.put(`/inquiries/${id}`, { status });
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`);

export default api;
