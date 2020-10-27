import React from 'react';
import Header from './components/Header/Header';

const AppShell = props => {
  const {children} = props;

  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}

export default AppShell;