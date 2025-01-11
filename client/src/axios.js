import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shop-oyck.onrender.com',
  withCredentials: true,
});

export default instance;