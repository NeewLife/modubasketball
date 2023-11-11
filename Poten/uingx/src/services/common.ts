import axios from 'axios';

const webpackMode = process.env.NODE_ENV || 'development';

const baseURL = webpackMode === 'development' ? '/proxy' : '';

export const CustomAxios = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});
