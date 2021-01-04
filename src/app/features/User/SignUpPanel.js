import React, { useState, useEffect } from 'react';
import { register } from '../../../store/reducers/authSlice';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';
import styled from 'styled-components';
import PasswordInput from '../../shared/PasswordInput/PasswordInput';
import Typography from '@material-ui/core/Typography';
import { DebounceInput } from 'react-debounce-input';
import AuthService from '../../../services/auth.service';
import { checkValidity } from '../../utils/utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';

const SignUpPanel = () => {
  const initialSignUpData = {
    name: {
      value: '',
      validationRules: {
        required: true,
        minLength: 2,
        maxLength: 64,
      },
      errorText: 'Nazwa uzytkownika powinna mieć od 2 do 64 znaków.',
      touched: false,
      valid: false,
      validating: false,
    },
    email: {
      value: '',
      validationRules: {
        required: true,
        isEmail: true,
      },
      errorText: 'Niepoprawy adres e-mail.',
      touched: false,
      valid: false,
      validating: false,
    },
    password: {
      value: '',
      validationRules: {
        required: true,
        passwordCheck: true,
      },
      errorText:
        'Hasło powinno mieć od 6 do 20 znaków, zawierać małą i duza literę oraz cyfrę.',
      touched: false,
      valid: false,
    },
  };

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [signUpData, setSignUpData] = useState(initialSignUpData);
  const [formValidation, setFormValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFormValid = () => {
      let valid = true;

      for (let i in signUpData) {
        if (signUpData[i].valid === false) {
          valid = false;
          break;
        }
      }

      if (valid) {
        setFormValidation(true);
      } else {
        setFormValidation(false);
      }
    };

    checkFormValid();
  }, [signUpData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(
      register(
        signUpData.name.value,
        signUpData.email.value,
        signUpData.password.value
      )
    ).catch(() => {
      setLoading(false);
    });
  };

  const handleChangeNameOrEmail = (value, mode) => {
    setSignUpData({
      ...signUpData,
      [mode]: {
        ...signUpData[mode],
        validating: true,
      },
    });

    AuthService.checkRegisterData(mode, value).then(
      () => {
        setSignUpData({
          ...signUpData,
          [mode]: {
            ...signUpData[mode],
            value: value,
            errorText: initialSignUpData[mode].errorText,
            touched: true,
            valid: checkValidity(value, signUpData[mode].validationRules),
            validating: false,
          },
        });
      },
      (error) => {
        setSignUpData({
          ...signUpData,
          [mode]: {
            ...signUpData[mode],
            value: value,
            errorText: error.response.data.error,
            touched: true,
            valid: false,
            validating: false,
          },
        });
      }
    );
  };

  return (
    <>
      <Typography variant='h6' component='h2'>
        Rejestracja
      </Typography>
      {message && (
        <StyledAlert variant='outlined' severity='error'>
          {message}
        </StyledAlert>
      )}
      <form onSubmit={handleFormSubmit}>
        <StyledDebounceInput
          debounceTimeout={500}
          element={TextField}
          variant='outlined'
          fullWidth
          type='text'
          label='Nazwa uzytkownika'
          value={signUpData.name.value}
          onChange={(e) => {
            handleChangeNameOrEmail(e.target.value, 'name');
          }}
          error={signUpData.name.touched && !signUpData.name.valid}
          helperText={
            signUpData.name.touched && !signUpData.name.valid
              ? signUpData.name.errorText
              : ''
          }
          isValid={signUpData.name.touched && signUpData.name.valid}
          required={true}
          multiline={false}
          name='username'
          autoComplete='name'
          autoFocus
          margin='normal'
          id='username'
          InputProps={{
            endAdornment: signUpData.name.validating && (
              <InputAdornment position='end'>
                <CircularProgress size={20} color='primary' />
              </InputAdornment>
            ),
          }}
        />

        <StyledDebounceInput
          debounceTimeout={500}
          element={TextField}
          variant='outlined'
          fullWidth
          type='email'
          label='Adres e-mail'
          value={signUpData.email.value}
          onChange={(e) => {
            handleChangeNameOrEmail(e.target.value, 'email');
          }}
          error={signUpData.email.touched && !signUpData.email.valid}
          helperText={
            signUpData.email.touched && !signUpData.email.valid
              ? signUpData.email.errorText
              : ''
          }
          isValid={signUpData.email.touched && signUpData.email.valid}
          required={true}
          multiline={false}
          name='email'
          autoComplete='email'
          margin='normal'
          id='email'
          InputProps={{
            endAdornment: signUpData.email.validating && (
              <InputAdornment position='end'>
                <CircularProgress size={20} color='primary' />
              </InputAdornment>
            ),
          }}
        />
        <PasswordInput
          id='signUpPassword'
          onInputChange={(e) => {
            setSignUpData({
              ...signUpData,
              password: {
                ...signUpData.password,
                value: e.target.value,
                errorText: signUpData.password.errorText,
                touched: true,
                valid: checkValidity(
                  e.target.value,
                  signUpData.password.validationRules
                ),
              },
            });
          }}
          error={signUpData.password.touched && !signUpData.password.valid}
          helperText={
            signUpData.password.touched && !signUpData.password.valid
              ? signUpData.password.errorText
              : 'Sprawdź podane hasło za pomocą ikony oka po prawej stronie.'
          }
          passwordValue={signUpData.password.value}
          isValid={signUpData.password.touched && signUpData.password.valid}
        />
        <ButtonLoading
          isDisabled={!formValidation || loading}
          loading={loading}
          ctaText='Zarejestruj'
        />
      </form>
    </>
  );
};

const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;

const StyledDebounceInput = styled(DebounceInput)`
  .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    ${({ isValid }) =>
      isValid &&
      `
    border-color: green;

  `}
  }
`;

export default SignUpPanel;
