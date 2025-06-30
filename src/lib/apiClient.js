// src/lib/apiClient.js
import axios from 'axios';

// Create an axios instance with Vite’s env vars, sending cookies
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true // include HTTP-only cookies
});

// Request interceptor – log requests in development
apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle common errors and log
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Unauthorized: redirect to login
      window.location.pathname = '/auth';
    }
    if (status === 403) {
      console.error('Access forbidden');
    }
    if (status >= 500) {
      console.error('Server error occurred');
    }
    if (import.meta.env.DEV) {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// This is how the api calls 


// // src/services/productService.js
// import apiClient from '../lib/apiClient';

// export const productService = {
//   // Get all products
//   getAllProducts: () => apiClient.get('/products'),
  
//   // Get single product
//   getProduct: (id) => apiClient.get(`/products/${id}`),
  
//   // Search products
//   searchProducts: (query) => apiClient.get(`/products/search?q=${query}`),
  
//   // Get products by category
//   getProductsByCategory: (category) => apiClient.get(`/products/category/${category}`),
// };

// // src/services/cartService.js
// import apiClient from '../lib/apiClient';

// export const cartService = {
//   // Get user's cart
//   getCart: () => apiClient.get('/cart'),
  
//   // Add item to cart
//   addToCart: (productId, quantity = 1) => 
//     apiClient.post('/cart/items', { productId, quantity }),
  
//   // Update cart item
//   updateCartItem: (itemId, quantity) => 
//     apiClient.put(`/cart/items/${itemId}`, { quantity }),
  
//   // Remove item from cart
//   removeFromCart: (itemId) => apiClient.delete(`/cart/items/${itemId}`),
  
//   // Clear entire cart
//   clearCart: () => apiClient.delete('/cart'),
// };

// // src/services/authService.js
// import apiClient from '../lib/apiClient';

// export const authService = {
//   // Login user
//   login: (credentials) => apiClient.post('/auth/login', credentials),
  
//   // Register user
//   register: (userData) => apiClient.post('/auth/register', userData),
  
//   // Get current user
//   getCurrentUser: () => apiClient.get('/auth/me'),
  
//   // Logout
//   logout: () => apiClient.post('/auth/logout'),
  
//   // Refresh token
//   refreshToken: () => apiClient.post('/auth/refresh'),
// };

// // src/services/orderService.js
// import apiClient from '../lib/apiClient';

// export const orderService = {
//   // Create new order
//   createOrder: (orderData) => apiClient.post('/orders', orderData),
  
//   // Get user's orders
//   getUserOrders: () => apiClient.get('/orders'),
  
//   // Get specific order
//   getOrder: (orderId) => apiClient.get(`/orders/${orderId}`),
  
//   // Cancel order
//   cancelOrder: (orderId) => apiClient.delete(`/orders/${orderId}`),
// };