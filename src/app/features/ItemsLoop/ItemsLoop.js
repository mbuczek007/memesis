import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import ItemsDataService from '../../../services/items.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';

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
  let history = useHistory();

  const { pageId } = useParams();
  const pageIdInt = parseInt(pageId);

  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState({
    offset: pageId ? (pageIdInt - 1) * 2 : 0,
    perPage: 2,
    currentPage: pageIdInt ? pageIdInt : 1,
    pageCount: null,
  });

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

      setPagination({
        ...pagination,
        pageCount: Math.ceil(itemsArray.length / pagination.perPage),
      });

      setItems(
        itemsArray
          .reverse()
          .slice(pagination.offset, pagination.offset + pagination.perPage)
      );
    };

    if (mode === 'pending') {
      ItemsDataService.getAllPending().on('value', onDataChange);
    } else {
      ItemsDataService.getAllAccepted().on('value', onDataChange);
    }
  }, [mode, pagination.currentPage, pagination.offset]);

  const handlePageClick = (e) => {
    window.scrollTo(0, 0);
    const selectedPage = e.selected;

    if (mode) {
      history.push({
        pathname: `/${mode}/${selectedPage + 1}`,
      });
    } else {
      history.push({
        pathname: `/page/${selectedPage + 1}`,
      });
    }

    setPagination({
      ...pagination,
      currentPage: selectedPage,
      offset: selectedPage * pagination.perPage,
    });
  };

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

      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        forcePage={pageIdInt ? pageIdInt - 1 : 0}
        containerClassName='MuiPagination-ul'
      />
    </Grid>
  );
};

export default ItemsLoop;
