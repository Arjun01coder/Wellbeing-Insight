import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication services
export const authService = {
  register: (userData) => API.post('/users/register', userData),
  login: (credentials) => API.post('/users/login', credentials),
  getCurrentUser: () => API.get('/users/me'),
  updateProfile: (profileData) => API.put('/users/profile', profileData),
  getDashboardData: () => API.get('/users/dashboard')
};

// Idol services
export const idolService = {
  getFeaturedIdols: () => API.get('/idols/featured'),
  getUserIdols: () => API.get('/idols'),
  addIdol: (idolData) => API.post('/idols', idolData),
  updateIdol: (idolId, data) => API.put(`/idols/${idolId}`, data),
  deleteIdol: (idolId) => API.delete(`/idols/${idolId}`),
  getFitnessIdols: () => API.get('/idols/fitness'),
  getAppearanceIdols: () => API.get('/idols/appearance'),
  getPersonalityIdols: () => API.get('/idols/personality')
};

// Progress services
export const progressService = {
  getUserProgress: () => API.get('/progress'),
  updateProgress: (progressData) => API.post('/progress', progressData),
  getFitnessProgress: () => API.get('/progress/fitness'),
  getAppearanceProgress: () => API.get('/progress/appearance'),
  getPersonalityProgress: () => API.get('/progress/personality'),
  logActivity: (activityData) => API.post('/progress/log-activity', activityData)
};

export default API;