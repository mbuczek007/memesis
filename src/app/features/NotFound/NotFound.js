import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <div>
    <Helmet>
      <title>Error 404</title>
    </Helmet>
    <h2>404 - Not Found</h2>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;
