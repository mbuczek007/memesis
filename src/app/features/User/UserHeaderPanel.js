import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { logout } from '../../../store/reducers/authSlice';
import { clearMessage } from '../../../store/reducers/messageSlice';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useDispatch, useSelector } from 'react-redux';
import UserLoginSignUp from '../User/UserLoginSignUp';
import styled from 'styled-components';

const UserHeaderPanel = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Button
            variant='outlined'
            color='primary'
            aria-controls='user-menu'
            aria-haspopup='true'
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {user.userData.name}
          </Button>
          <Menu
            id='user-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem>Profil</MenuItem>
            <MenuItem onClick={handleLogOut}>Wyloguj</MenuItem>
          </Menu>
        </div>
      ) : (
        <>
          <PopupState variant='popover' popupId='user-popup-login'>
            {(popupState) => (
              <>
                <AuthButtonButton
                  variant='contained'
                  color='primary'
                  {...bindTrigger(popupState)}
                >
                  Zaloguj
                </AuthButtonButton>
                <Popover
                  onExited={() => {
                    dispatch(clearMessage());
                  }}
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <UserLoginSignUp />
                </Popover>
              </>
            )}
          </PopupState>
          <PopupState variant='popover' popupId='user-popup-sign-up'>
            {(popupState) => (
              <>
                <AuthButtonButton
                  variant='contained'
                  color='secondary'
                  {...bindTrigger(popupState)}
                >
                  Rejestracja
                </AuthButtonButton>
                <Popover
                  onExited={() => {
                    dispatch(clearMessage());
                  }}
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <UserLoginSignUp registerMode />
                </Popover>
              </>
            )}
          </PopupState>
        </>
      )}
    </>
  );
};

const AuthButtonButton = styled(Button)`
  margin-left: 15px;
`;

export default UserHeaderPanel;
