import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import AppShell from './core/AppShell/AppShell';
import ItemsLoop from './features/ItemsLoop/ItemsLoop';
import AddNew from './features/AddNew/AddNew';
import ViewItem from './features/ViewItem/ViewItem';
import NotFound from './features/NotFound/NotFound';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/reducers/authSlice';
import useAuth from './hooks/useAuth';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  const { loading } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <CssBaseline />
        <AppShell>
          <Switch>
            <Route key='home-mode' path='/' exact>
              <ItemsLoop mode='' />
            </Route>
            <Route key='home-mode-page' path='/page/:pageId?'>
              <ItemsLoop mode='' />
            </Route>
            <Route key='pending-mode' path='/pending/:pageId?'>
              <ItemsLoop mode='pending' />
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
