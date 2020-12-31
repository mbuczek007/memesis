import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { logout } from '../../../store/reducers/authSlice';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useDispatch, useSelector } from 'react-redux';
import UserLoginSignUp from '../User/UserLoginSignUp';

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
            <MenuItem>Moje motywatory</MenuItem>
            <MenuItem>Profil</MenuItem>
            <MenuItem onClick={handleLogOut}>Wyloguj</MenuItem>
          </Menu>
        </div>
      ) : (
        <PopupState variant='popover' popupId='user-popup-popover'>
          {(popupState) => (
            <>
              <Button
                variant='contained'
                color='primary'
                {...bindTrigger(popupState)}
              >
                Zaloguj
              </Button>
              <Popover
                onExited={() => {}}
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
      )}
    </>
  );
};

export default UserHeaderPanel;
