import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
    maxWidth: 610,
  },
}));

const AppShell = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container component='main' className={classes.mainContent}>
        <Grid container spacing={5}>
          {children}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AppShell;
