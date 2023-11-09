import axios from 'axios';

export const CustomAxios = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});
