import React from 'react';
import { Link } from 'react-router-dom';

const AppDrawer = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Główna</Link>
        </li>
        <li>
          <Link to='/pending'>Poczekalnia</Link>
        </li>
        <li>
          <Link to='/add'>Dodaj</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppDrawer;
