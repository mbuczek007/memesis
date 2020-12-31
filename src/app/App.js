import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppShell from './core/AppShell/AppShell';
import ItemsLoop from './features/ItemsLoop/ItemsLoop';
import AddNew from './features/AddNew/AddNew';
import ViewItem from './features/ViewItem/ViewItem';
import NotFound from './features/NotFound/NotFound';
import AppTheme from './theme/AppTheme';
import { checkAuth } from '../store/reducers/authSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <AppTheme>
      <HelmetProvider>
        <AppShell>
          <Switch>
            <Route key='home-mode' path='/' exact>
              <ItemsLoop mode='accepted' />
            </Route>
            <Route key='home-mode-page' path='/page/:pageId?'>
              <ItemsLoop mode='accepted' />
            </Route>
            <Route key='pending-mode' path='/pending/:pageId?'>
              <ItemsLoop mode='pending' />
            </Route>
            <Route path='/add'>
              <AddNew />
            </Route>
            <Route path='/:itemId'>
              <ViewItem />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </AppShell>
      </HelmetProvider>
    </AppTheme>
  );
};

export default App;
