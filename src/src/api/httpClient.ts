import axios, { AxiosInstance } from 'axios';

const createClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: '/api',
    withCredentials: true
  });

  return instance;
};

export const httpClient = createClient();

