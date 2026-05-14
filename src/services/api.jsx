import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.10.16.32:9696/api', // METTRE SON IP
});

export default API;