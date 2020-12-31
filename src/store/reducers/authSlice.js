import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import { setMessage, clearMessage } from '../reducers/messageSlice';

const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const slice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logInSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    loginFail: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { logInSuccess, logOut, loginFail } = slice.actions;

export const register = (name, email, password) => (dispatch) => {
  return AuthService.register(name, email, password).then(
    (response) => {
      console.log(response.data);

      dispatch(setMessage({ message: response.data.message }));

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data);

      return Promise.reject();
    }
  );
};

export const login = (email, name, password) => (dispatch) => {
  return AuthService.login(email, name, password).then(
    (data) => {
      dispatch(
        logInSuccess({
          user: data,
        })
      );

      dispatch(clearMessage());

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data);

      dispatch(loginFail());
      dispatch(setMessage({ message: error.response.data.errors }));

      return Promise.reject();
    }
  );
};

export const facebooklogin = (accessToken, userID) => (dispatch) => {
  return AuthService.facebookLogin(accessToken, userID).then(
    (data) => {
      dispatch(
        logInSuccess({
          user: data,
        })
      );

      dispatch(clearMessage());

      console.log(data);
      return Promise.resolve();
    },
    (error) => {
      dispatch(loginFail());
      console.log(error.response);
      /* dispatch(setMessage({ message: error.response.data.error })); */

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch(logOut());
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const checkAuth = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    dispatch(logout());
  } else {
    if (Math.floor(new Date().getTime() / 1000) > user.expirationTime) {
      dispatch(logout());
    } else {
      dispatch(
        logInSuccess({
          user,
        })
      );

      dispatch(checkAuthTimeout(3600));
    }
  }
};

export default slice.reducer;
