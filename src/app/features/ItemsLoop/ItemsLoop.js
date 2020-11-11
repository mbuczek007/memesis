import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import ItemsDataService from '../../../services/items.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  loaderClass: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const ItemsLoop = ({ mode }) => {
  const classes = useStyles();
  const [items, setItems] = useState(null);

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

    if (mode === 'pending') {
      ItemsDataService.getAllPending().on('value', onDataChange);
    } else {
      ItemsDataService.getAllAccepted().on('value', onDataChange);
    }
  }, [setItems, mode]);

  if (!items) {
    return (
      <div className={classes.loaderClass}>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title={mode !== 'pending' ? 'Główna' : 'Poczekalnia'} />
      {items.length === 0 ? (
        <Typography
          className={classes.centerClass}
          gutterBottom
          variant='h5'
          component='h2'
        >
          Nie znaleziono rekordów
        </Typography>
      ) : (
        items.map((item) => (
          <CardItem key={item.id} item={item} linked={true} />
        ))
      )}
    </Grid>
  );
};

export default ItemsLoop;
