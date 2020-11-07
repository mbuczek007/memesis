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
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/reducers/authSlice';

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
  const authChecking = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (authChecking) {
    return null;
  }

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
