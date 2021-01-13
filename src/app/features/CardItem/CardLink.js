import React from 'react';
import { HashLink as RouterLink } from 'react-router-hash-link';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

const CardLInk = ({ children, linked, itemId, commentsMode }) => {
  if (!linked) {
    return children;
  }

  return (
    <StyledLink
      underline='none'
      component={RouterLink}
      to={`/view/${itemId}${commentsMode ? '#comments' : ''}`}
      comments={commentsMode}
    >
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  ${({ comments }) =>
    !comments &&
    `
    color: #000;
    display: block;
    `}

  ${({ comments }) =>
    comments &&
    `
    color: #263238;
    `}
`;

export default CardLInk;
