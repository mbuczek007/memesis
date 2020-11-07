import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    name: null,
    image: null,
    loading: true,
  },
  reducers: {
    logInAction: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.loading = false;
    },
    logOutAction: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('image');

      state.token = null;
      state.userId = null;
      state.name = null;
      state.image = null;
      state.loading = false;
    },
  },
});

export const { logInAction, logOutAction } = slice.actions;

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logOutAction());
  } else {
    const time = Math.floor(new Date().getTime() / 1000);
    const expirationTime = localStorage.getItem('expirationTime');

    if (time > expirationTime) {
      dispatch(logOutAction());
    } else {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('name');
      const userImage = localStorage.getItem('image');

      dispatch(
        logInAction({
          token: token,
          userId: userId,
          name: userName,
          image: userImage,
        })
      );

      dispatch(checkAuthTimeout(3600));
    }
  }

  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '358432648571666',
      cookie: false,
      xfbml: true,
      version: 'v2.7',
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

const auth = (response) => (dispatch) => {
  if (response.status === 'connected') {
    const authResponse = response;
    window.FB.api('/me', 'GET', { fields: 'id, name, picture' }, function (
      response
    ) {
      console.log(response);

      localStorage.setItem('token', authResponse.authResponse.accessToken);
      localStorage.setItem(
        'expirationTime',
        authResponse.authResponse.data_access_expiration_time
      );
      localStorage.setItem('userId', response.id);
      localStorage.setItem('name', response.name);
      localStorage.setItem('image', response.picture.data.url);

      dispatch(
        logInAction({
          token: authResponse.authResponse.accessToken,
          userId: response.id,
          name: response.name,
          image: response.picture.data.url,
        })
      );
      dispatch(checkAuthTimeout(authResponse.authResponse.expiresIn));
    });
  } else if (response.status === 'not_authorized') {
    dispatch(logOutAction());
  } else {
    dispatch(logOutAction());
  }
};

export const logOut = () => (dispatch) => {
  dispatch(logOutAction());

  window.FB.logout((response) => {
    console.log(response);
  });
};

export const logIn = () => (dispatch) => {
  window.FB.login((response) => {
    console.log(response);
    dispatch(auth(response));
  });
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logOutAction());
  }, expirationTime * 1000);
};

export default slice.reducer;
