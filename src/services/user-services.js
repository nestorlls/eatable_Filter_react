import { tokenKey } from '../config';
import apiFetch from './api-fetch';

export const createUser = (userData) => {
  return apiFetch('/users', { body: userData }).then((u) => {
    const { token, ...user } = u;
    sessionStorage.setItem(tokenKey, token);
    return user;
  });
};
