import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL: process.env.API_URL,
});

export default api;