import React, { useState, useEffect } from 'react';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../api';
import NotFound from '../NotFound/NotFound';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const itemsPerPage = 3;

const ItemsLoop = ({ mode }) => {
  let history = useHistory();
  const { pageId } = useParams();
  const pageIdInt = parseInt(pageId);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState({});

  const [pagination, setPagination] = useState({
    offset: pageId ? (pageIdInt - 1) * itemsPerPage : 0,
    perPage: itemsPerPage,
    currentPage: pageIdInt ? pageIdInt : 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchItems = async () => {
      setIsLoading(true);

      await api
        .getItems(mode, pagination.perPage, pagination.offset)
        .then((items) => {
          if (items.data.items.docs.length === 0) {
            setNotFound(true);
          } else {
            setItems(items.data.items);
          }

          setIsLoading(false);
        })
        .catch(() => {
          setNotFound(true);
        });
    };

    fetchItems();
  }, [mode, pagination.perPage, pagination.offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    if (mode === 'pending') {
      history.push({
        pathname: `/pending/${selectedPage + 1}`,
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

  const renderItemsSkeleton = () => {
    const skeletonItems = 2;
    let skElems = [];

    for (var i = 0; i < skeletonItems; i++) {
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

  if (notFound) {
    return <NotFound />;
  }

  return (
    <Grid item xs={12} sm={12} md={12}>
      {isLoading ? (
        renderItemsSkeleton()
      ) : (
        <>
          <PageTitle title={mode !== 'pending' ? 'Główna' : 'Poczekalnia'} />
          {items.docs.map((item) => (
            <CardItem key={item.id} item={item} linked={true} loading={false} />
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
