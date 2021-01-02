import React, { useState } from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import LoginPanel from '../User/LoginPanel';
import SignUpPanel from '../User/SignUpPanel';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../../store/reducers/messageSlice';

const UserLoginSignUp = () => {
  const dispatch = useDispatch();
  const [signUpView, setSignUpView] = useState(false);

  const handleChangeView = (e) => {
    e.preventDefault();
    setSignUpView(!signUpView);
    dispatch(clearMessage());
  };

  return (
    <StyledBox p={2}>
      <>
        {signUpView ? <SignUpPanel /> : <LoginPanel />}
        <StyledLink
          href='#'
          variant='body2'
          onClick={(e) => handleChangeView(e)}
        >
          {signUpView ? (
            <>
              Posiadasz konto? <strong>Zaloguj się</strong>
            </>
          ) : (
            <>
              Nie masz konta? <strong>Zarejestruj się</strong>
            </>
          )}
        </StyledLink>
      </>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  width: 100%;
  max-width: 400px;
`;

const StyledLink = styled(Link)`
  padding-top: 15px;
  display: block;
  text-align: center;
`;

export default UserLoginSignUp;
