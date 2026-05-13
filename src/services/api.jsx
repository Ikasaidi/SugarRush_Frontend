import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.68.109:9696/api', // METTRE SON IP
});

export default API;