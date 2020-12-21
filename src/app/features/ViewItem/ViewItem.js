import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../shared/PageTitle/PageTitle';
import NotFound from '../NotFound/NotFound';
import Grid from '@material-ui/core/Grid';
import CardItem from '../CardItem/CardItem';
import api from '../../../api';
import styled from 'styled-components';

const ViewItem = () => {
  let { itemId } = useParams();
  const [vievedItem, setVievedItem] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getItem = async () => {
      await api
        .getItemById(itemId)
        .then((item) => {
          if (!item) {
            setNotFound(true);
          } else {
            setVievedItem({ data: item.data.data });
          }
          setIsLoading(false);
        })
        .catch(() => {
          setNotFound(true);
        });
    };

    getItem();
  }, [itemId]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <StyledGridItem item xs={12} sm={12} md={12}>
      {isLoading ? (
        <>
          <PageTitle title='Ładowanie...' />
          <CardItem item={null} linked={false} loading={true} />
        </>
      ) : (
        <>
          <PageTitle title={vievedItem.data.title} />
          <CardItem item={vievedItem.data} linked={false} loading={false} />
        </>
      )}
    </StyledGridItem>
  );
};

const StyledGridItem = styled(Grid)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`;

export default ViewItem;
