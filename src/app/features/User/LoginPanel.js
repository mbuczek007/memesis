import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import { login } from '../../../store/reducers/authSlice';
import styled from 'styled-components';
import PasswordInput from '../../shared/PasswordInput/PasswordInput';
import Typography from '@material-ui/core/Typography';
import FacebookLoginButton from './FacebookLoginButton';

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

  const handleFacebookLoading = (value) => {
    setLoading(value);
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
      <FacebookLoginButton
        isLoadingCallback={handleFacebookLoading}
        buttonText='Zaloguj się przez facebooka'
      />
    </>
  );
};

const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;

export default LoginPanel;
