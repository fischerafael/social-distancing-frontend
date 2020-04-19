import axios from 'axios';

const api = axios.create({
    baseURL: 'https://social-distancing-br.herokuapp.com',
});

export default api;