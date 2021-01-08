import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

const CardLInk = ({ children, linked, itemId }) => {
  if (!linked) {
    return children;
  }

  return (
    <StyledLink underline='none' component={RouterLink} to={`/view/${itemId}`}>
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: block;
  color: #000;
`;

export default CardLInk;
