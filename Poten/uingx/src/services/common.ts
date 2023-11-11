import axios from 'axios';

export const CustomAxios = axios.create({
  baseURL: '/proxy',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});
