import React from 'react';
import { StyledButton } from './FacebookLoginButton.styled';

const FacebookLoginButton = ({ onHandleClick }) => {
  return (
    <StyledButton onClick={onHandleClick}>Login with Facebook</StyledButton>
  );
};

export default FacebookLoginButton;
