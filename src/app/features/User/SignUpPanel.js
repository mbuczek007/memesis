import React, { useState } from 'react';
import { register } from '../../../store/reducers/authSlice';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import { clearMessage } from '../../../store/reducers/messageSlice';
import styled from 'styled-components';
import PasswordInput from '../../shared/PasswordInput/PasswordInput';
import Typography from '@material-ui/core/Typography';

const SignUpPanel = () => {
  const initialSignUpData = {
    name: '',
    email: '',
    password: '',
    loading: false,
  };

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [signUpData, setSignUpData] = useState(initialSignUpData);
  const [userCreatedSuccess, setUserCreatedSuccess] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(register(signUpData.name, signUpData.email, signUpData.password))
      .then(() => {
        setUserCreatedSuccess(true);
      })
      .catch(() => {
        setUserCreatedSuccess(false);
      });
  };

  return (
    <>
      <Typography variant='h6' component='h2'>
        Rejestracja
      </Typography>
      {userCreatedSuccess ? (
        <>
          <StyledAlert variant='outlined' severity='success'>
            Rejestracja przebiegła pomyślnie.
          </StyledAlert>
        </>
      ) : (
        <>
          {message && (
            <StyledAlert variant='outlined' severity='error'>
              {message}
            </StyledAlert>
          )}
          <form onSubmit={handleFormSubmit}>
            <TextField
              variant='outlined'
              required
              fullWidth
              margin='normal'
              id='username'
              label='Nazwa uzytkownika'
              name='username'
              autoComplete='name'
              autoFocus
              value={signUpData.name}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  name: e.target.value,
                });
              }}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              margin='normal'
              id='email'
              label='Adres email'
              name='email'
              autoComplete='email'
              value={signUpData.email}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  email: e.target.value,
                });
              }}
            />
            <PasswordInput
              id='signUpPassword'
              onInputChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  password: e.target.value,
                });
              }}
              passwordValue={signUpData.password}
            />
            <ButtonLoading loading={signUpData.loading} ctaText='Zarejestruj' />
          </form>
        </>
      )}
    </>
  );
};

const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;

export default SignUpPanel;
