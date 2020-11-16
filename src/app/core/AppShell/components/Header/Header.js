import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import UserMenu from '../../../../features/UserMenu/UserMenu';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar
      position='sticky'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          <Link component={RouterLink} to='/' color='inherit'>
            MeMesis
          </Link>
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            to='/'
            variant='button'
            color='textPrimary'
            className={classes.link}
          >
            Główna
          </Link>
          <Link
            component={RouterLink}
            to='/pending'
            variant='button'
            color='textPrimary'
            className={classes.link}
          >
            Poczekalnia
          </Link>
          <Link
            component={RouterLink}
            to='/add'
            variant='button'
            color='textPrimary'
            className={classes.link}
          >
            Dodaj
          </Link>
        </nav>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
