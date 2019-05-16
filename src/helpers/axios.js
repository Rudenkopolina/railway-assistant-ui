import axios from 'axios';
import { get } from 'lodash';
import Cookies from 'js-cookie';

import { config } from '../config';

const URL = config.server.api;
let axiosInstance = null;

export function initAxiosInstance(history) {
  axiosInstance = axios.create({ baseURL: URL });

  axiosInstance.interceptors.request.use(config => {
    const token = Cookies.get('authCode');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => Promise.reject(error));

  axiosInstance.interceptors.response.use(response => response, error => {
    const status = get(error, 'response.status');
    if (status === 401) {
      history.push('/login');
    }
    return Promise.reject(error);
  });
}

export { axiosInstance, URL };
