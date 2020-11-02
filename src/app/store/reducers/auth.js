import React, { useReducer, useMemo, useContext, useEffect } from 'react';

const initialState = {
  token: null,
  userId: null,
  name: null,
  image: null,
};

export const AuthContext = React.createContext(initialState);

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const setAutState = (dispatch, response) => {
  if (response.status === 'connected') {
    const authResponse = response;
    window.FB.api('/me', 'GET', { fields: 'id, name, picture' }, function (
      response
    ) {
      console.log(response);
      dispatch({
        type: 'AUTH_LOGIN',
        payload: {
          token: authResponse.authResponse.accessToken,
          userId: response.id,
          name: response.name,
          image: response.picture.data.url,
        },
      });
    });
  } else if (response.status === 'not_authorized') {
    dispatch({ type: 'AUTH_LOGOUT' });
  } else {
    dispatch({ type: 'AUTH_LOGOUT' });
  }
};

const authLogin = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    name: action.payload.name,
    image: action.payload.image,
  });
};

const authLogout = (state) => {
  return updateObject(state, initialState);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOGOUT':
      return authLogout(state, action);
    case 'AUTH_LOGIN':
      return authLogin(state, action);
    default:
      return;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '358432648571666',
        cookie: false,
        xfbml: true,
        version: 'v2.7',
      });

      window.FB.getLoginStatus(function (response) {
        console.log(response);
        setAutState(dispatch, response);
      });
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthProvider');
  }

  const { state, dispatch } = context;
  const user = state;

  const logOut = () => {
    window.FB.logout((response) => {
      console.log(response);
      dispatch({ type: 'AUTH_LOGOUT' });
    });
  };

  const logIn = () => {
    window.FB.login((response) => {
      console.log(response);
      setAutState(dispatch, response);
    });
  };

  return { user, logIn, logOut };
};
