import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const checkRegisterData = (nameOrEmail) => {
  return axios
    .post(API_URL + 'auth/signup/check', {
      nameOrEmail,
    })
    .then((response) => {
      return response.data;
    });
};

const register = (name, email, password) => {
  return axios
    .post(API_URL + 'auth/signup', {
      name,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, name, password) => {
  return axios
    .post(API_URL + 'auth/login', {
      email,
      name,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const facebookLogin = (accessToken, userId) => {
  return axios
    .post(API_URL + 'auth/facebooklogin', {
      accessToken,
      userId,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
  facebookLogin,
  register,
  checkRegisterData,
};
