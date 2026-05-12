import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.190.1:9696/api', // METTRE SON IP
});

export default API;