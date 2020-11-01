import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './features/MainPage/MainPage';
import Pending from './features/Pending/Pending';
import AddNew from './features/AddNew/AddNew';
import ViewItem from './features/ViewItem/ViewItem';
import NotFound from './features/NotFound/NotFound';
import AppShell from './core/AppShell/AppShell';
import { useAuthContext } from './store/reducers/auth';
import { facebookAuth } from './utils/facebookAuth';

const theme = {
  palette: {
    primary: {
      main: '#006bb5',
    },
    secondary: {
      light: '#78809e',
      main: '#dc004e',
    },
  },
};

const App = () => {
  const { authCheck } = useAuthContext();

  useEffect(() => {
    facebookAuth(authCheck);
  }, [authCheck]);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <AppShell>
          <Switch>
            <Route path='/' exact>
              <MainPage />
            </Route>
            <Route path='/pending'>
              <Pending />
            </Route>
            <Route path='/add'>
              <AddNew />
            </Route>
            <Route path='/view/:itemId'>
              <ViewItem />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </AppShell>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
