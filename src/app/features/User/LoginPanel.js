import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import { login, facebooklogin } from '../../../store/reducers/authSlice';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@material-ui/icons/Facebook';
import PasswordInput from '../../shared/PasswordInput/PasswordInput';
import Typography from '@material-ui/core/Typography';

const initialLoginData = {
  loginOrEmail: '',
  password: '',
};

const LoginPanel = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState(initialLoginData);
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(
      login(loginData.loginOrEmail, loginData.loginOrEmail, loginData.password)
    ).catch(() => {
      setLoading(false);
    });
  };

  const handleClickFacebookLogin = () => {
    setLoading(true);
    setLoginData(initialLoginData);
  };

  const responseFacebook = (response) => {
    dispatch(facebooklogin(response.accessToken, response.userID)).catch(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Typography variant='h6' component='h2'>
        Logowanie
      </Typography>
      {message && (
        <StyledAlert variant='outlined' severity='error'>
          {message}
        </StyledAlert>
      )}
      <form onSubmit={handleFormSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='emailOrEmail'
          label='Nazwa uzytkownika lub email'
          name='emailOrEmail'
          value={loginData.loginOrEmail}
          autoFocus
          onChange={(e) => {
            setLoginData({
              ...loginData,
              loginOrEmail: e.target.value,
            });
          }}
        />
        <PasswordInput
          id='loginPassword'
          onInputChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value,
            });
          }}
          passwordValue={loginData.password}
        />
        <ButtonLoading loading={loading} ctaText='Zaloguj' />
      </form>
      <FacebookLogin
        appId='358432648571666'
        autoLoad={false}
        onClick={handleClickFacebookLogin}
        isDisabled={loading}
        callback={responseFacebook}
        render={(renderProps) => (
          <StyledFacebookLoginButton
            size='large'
            fullWidth
            variant='contained'
            startIcon={<FacebookIcon />}
            onClick={renderProps.onClick}
            disabled={loading}
          >
            Zaloguj się przez facebooka
          </StyledFacebookLoginButton>
        )}
      />
    </>
  );
};

const StyledFacebookLoginButton = styled(Button)`
  width: 100%;
  color: #fff;

  &,
  &:hover {
    background-color: #3b5998;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;

export default LoginPanel;
