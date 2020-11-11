import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageTitle from '../../shared/PageTitle/PageTitle';
import NotFound from '../NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import ItemsDataService from '../../../services/items.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CardItem from '../CardItem/CardItem';

const useStyles = makeStyles(() => ({
  loaderClass: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const ViewItem = () => {
  const classes = useStyles();
  let { itemId } = useParams();
  const location = useLocation();
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

    if (!location.item) {
      ItemsDataService.getSingleItem(itemId).on('value', onDataChange);
    } else {
      setVievedItem({ ...vievedItem, data: location.item });
      window.scrollTo(0, 0);
    }
  }, [itemId, location.item]);

  if (notFound) {
    return <NotFound />;
  }

  if (Object.keys(vievedItem).length === 0) {
    return (
      <div className={classes.loaderClass}>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <Grid item xs={12} sm={12} md={12}>
      <PageTitle title={vievedItem.data.title} />
      <CardItem item={vievedItem.data} linked={false} />
    </Grid>
  );
};

export default ViewItem;
