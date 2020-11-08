import React from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';

const MainPage = () => {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title='Główna' />
      <CardItem />
      <CardItem />
    </Grid>
  );
};

export default MainPage;
