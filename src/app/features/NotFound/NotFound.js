import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
  <>
    <Helmet>
      <title>Error 404</title>
    </Helmet>
    <h1>404 - Not Found</h1>
    <Link to='/'>Go Home</Link>
  </>
);

export default NotFound;
