import React, { useState } from 'react';
import FacebookLoginButton from '../../shared/FacebookLoginButton/FacebookLoginButton';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../store/reducers/authSlice';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  userMenuItem: {
    marginLeft: theme.spacing(2),
  },
}));

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLogIn, user } = useAuth();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    setAnchorEl(null);
  };
  return (
    <>
      {isLogIn ? (
        <div className={classes.userMenuItem}>
          <Button
            aria-controls='user-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Avatar alt={user.name} src={user.image} />
          </Button>
          <Menu
            id='user-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{user.name}</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <FacebookLoginButton onHandleClick={() => dispatch(logIn())} />
      )}
    </>
  );
};

export default UserMenu;
