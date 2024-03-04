import axios from 'axios';
const baseURL = `${import.meta.env.VITE_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

// send the jwt in the authorization headers
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
