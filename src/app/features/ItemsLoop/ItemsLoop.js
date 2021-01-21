import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ItemService from '../../../services/item.service';
import ChangeStatusButton from '../CardItem/ChangeStatusButton';
import Typography from '@material-ui/core/Typography';

const itemsPerPage = 3;

const ItemsLoop = ({ mode }) => {
  let history = useHistory();
  const { pageId } = useParams();
  const pageIdInt = parseInt(pageId);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [removeAction, setRemoveAction] = useState(false);

  const [pagination, setPagination] = useState({
    offset: pageId ? (pageIdInt - 1) * itemsPerPage : 0,
    perPage: itemsPerPage,
    currentPage: pageIdInt ? pageIdInt : 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  useEffect(() => {
    const fetchItems = () => {
      setIsLoading(true);

      ItemService.getItems(
        mode,
        pageId ? pagination.perPage : itemsPerPage,
        pageId ? pagination.offset : 0
      ).then(
        (data) => {
          setItems(data.items);
          setIsLoading(false);
        },
        (error) => {
          console.log(error.response);
          setIsLoading(false);
        }
      );
    };

    fetchItems();
  }, [mode, pagination.perPage, pagination.offset, pageId, removeAction]);

  const handleRemoveItem = () => {
    setRemoveAction(!removeAction);
  };

  const generatePageTitle = () => {
    let title = '';

    if (mode === 'accepted') {
      title = 'Główna';
    } else if (mode === 'pending') {
      title = 'W kolejce';
    } else if (mode === 'top') {
      title = 'Najlepsze';
    }

    return title;
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const page = selectedPage + 1;
    let pathname = '';

    if (mode === 'pending' || mode === 'top') {
      pathname = `/${mode}/${page}`;
    } else if (mode === 'accepted') {
      pathname = `/page/${page}`;
    }

    history.push({ pathname });

    setPagination({
      ...pagination,
      currentPage: selectedPage,
      offset: selectedPage * pagination.perPage,
    });
  };

  const renderItemsSkeleton = () => {
    const skeletonItems = 2;
    let skElems = [];

    for (let i = 0; i < skeletonItems; i++) {
      skElems.push(
        <CardItem key={i} item={null} linked={false} loading={true} />
      );
    }

    return (
      <>
        <PageTitle title='Ładowanie...' />
        {skElems}
      </>
    );
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      {isLoading ? (
        renderItemsSkeleton()
      ) : (
        <>
          <PageTitle title={generatePageTitle()} />
          {items ? (
            <>
              {items.docs.map((item) => (
                <React.Fragment key={item.id}>
                  {mode !== 'top' && (
                    <ChangeStatusButton
                      itemId={item.id}
                      isAccepted={item.isAccepted}
                      itemFirstAcceptedDate={item.firstAcceptedDate}
                      itemRemoved={handleRemoveItem}
                    />
                  )}
                  <CardItem item={item} linked={true} loading={false} />
                </React.Fragment>
              ))}
              <StyledReactPaginate>
                <ReactPaginate
                  previousLabel={'wcześniejsza'}
                  nextLabel={'następna'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={items.totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  forcePage={pageIdInt ? pageIdInt - 1 : 0}
                />
              </StyledReactPaginate>
            </>
          ) : (
            <Typography variant='h6' align='center' component='h4'>
              Brak treści do wyświetlenia.
            </Typography>
          )}
        </>
      )}
    </Grid>
  );
};

const StyledReactPaginate = styled(Paper)`
  padding: 1rem;
  text-align: center;

  ul,
  li {
    margin: 0;
    list-style: none;
    display: inline;
    padding-left: 0px;
  }

  li {
    margin: 0 4px;
  }

  .active,
  .disabled {
    a {
      cursor: default;
    }
  }

  .disabled {
    opacity: 0.6;
  }

  .active a,
  li:not(.disabled) a:hover {
    color: #fdfdfd;
    background-color: #1d1f20;
    border: solid 1px #1d1f20;
  }

  .next,
  .previous {
    margin: 0 20px;
  }

  a {
    border: solid 1px #d7d7d7;
    border-radius: 0.2rem;
    color: #7d7d7d;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    padding: 0.5rem 0.9rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

export default ItemsLoop;
