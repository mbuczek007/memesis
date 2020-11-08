import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../shared/PageTitle/PageTitle';
import NotFound from '../NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import ItemsDataService from '../../../services/items.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CardItem from '../CardItem/CardItem';

const useStyles = makeStyles(() => ({
  loader: {
    margin: '0 auto',
  },
}));

const ViewItem = () => {
  const classes = useStyles();
  let { itemId } = useParams();
  const [vievedItem, setVievedItem] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const onDataChange = (item) => {
      const data = item.val();

      if (!data) {
        setNotFound(true);
      } else {
        setVievedItem({ ...vievedItem, data: data[itemId] });
      }
    };

    ItemsDataService.getSingleItem(itemId).on('value', onDataChange);
  }, [itemId]);

  if (notFound) {
    return <NotFound />;
  }

  if (Object.keys(vievedItem).length === 0) {
    return (
      <div className={classes.loader}>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title={vievedItem.data.title} />
      <CardItem item={vievedItem.data} />
    </Grid>
  );
};

export default ViewItem;
