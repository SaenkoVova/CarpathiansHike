import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.get['Accept'] = 'application/json';

const token = localStorage.getItem('token');

if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}