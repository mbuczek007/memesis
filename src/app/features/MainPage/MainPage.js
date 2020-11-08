import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import ItemsDataService from '../../../services/items.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loader: {
    textAlign: 'center',
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onDataChange = (items) => {
      let itemsArray = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        itemsArray.push({
          id: key,
          title: data.title,
          imageUrl: data.imageUrl,
          createDate: data.createDate,
        });
      });

      setItems(itemsArray.reverse());
    };
    ItemsDataService.getAllPending().on('value', onDataChange);
  }, [setItems]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title='Główna' />
      {items.length === 0 ? (
        <div className={classes.loader}>
          <CircularProgress color='secondary' />
        </div>
      ) : (
        items.map((item) => <CardItem key={item.id} item={item} />)
      )}
    </Grid>
  );
};

export default MainPage;
