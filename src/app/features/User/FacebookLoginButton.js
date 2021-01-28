import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@material-ui/icons/Facebook';
import { facebooklogin } from '../../../store/reducers/authSlice';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const FacebookLoginButton = ({ isLoadingCallback, buttonText }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClickFacebookLogin = () => {
    isLoadingCallback(true);
    setLoading(true);
  };

  const responseFacebook = (response) => {
    dispatch(facebooklogin(response.accessToken, response.userID)).catch(() => {
      setLoading(false);
      isLoadingCallback(false);
    });
  };

  return (
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
          {buttonText}
        </StyledFacebookLoginButton>
      )}
    />
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

export default FacebookLoginButton;
