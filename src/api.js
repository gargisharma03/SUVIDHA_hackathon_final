// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',   // your Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createComplaint = async (data) => {
  try {
    const response = await API.post('/complaints/', data);
    return response.data;   // returns { complaint: {...}, simulated_sms: "..." }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// src/api.js (add this below createComplaint)

export const getComplaintById = async (id) => {
  try {
    const response = await API.get(`/complaints/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching status:", error.response?.data || error.message);
    throw error;
  }
};