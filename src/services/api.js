import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL: "https://social-distancing-br.herokuapp.com"     
});

export default api;