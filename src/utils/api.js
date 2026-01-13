import axios from "axios";

// Base URL for your API
const API_BASE_URL = 'http://localhost:8000/api/v1/docstore/'; // Adjust to your Django backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});


// Combined API request function
export const apiRequest = async (method, endpoint, data = null, params = {}) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url: endpoint,
      params: params,
    };

    // Add data for POST, PUT, DELETE methods
    if (data && ['post', 'put', 'delete'].includes(method.toLowerCase())) {
      config.data = data;
    }

    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} Error:`, error);
    throw error;
  }
};


export default api;