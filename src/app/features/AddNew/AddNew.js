import React from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useAuth from '../../hooks/useAuth';

const AddNew = () => {
  const { isLogIn } = useAuth();

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title='Dodaj' />
      {!isLogIn ? (
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          component='p'
        >
          Zaloguj się aby dodawać nowe rzeczy.
        </Typography>
      ) : (
        <>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Dodaj
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            component='p'
          >
            Quickly build an effective pricing table for your potential
            customers with this layout. It&apos;s built with default Material-UI
            components with little customization.
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default AddNew;
