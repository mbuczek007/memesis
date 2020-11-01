import React from 'react';
import Normalize from 'react-normalize';
import Header from './components/Header/Header';

const AppShell = (props) => {
  const { children } = props;

  return (
    <div>
      <Normalize />
      <Header />
      {children}
    </div>
  );
};

export default AppShell;
