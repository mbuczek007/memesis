import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import MainPage from './features/MainPage/MainPage';

const theme = {
  palette: {
    primary: {
      main: '#006bb5',
    },
    secondary: {
      light: '#78809e',
      main: '#dc004e',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={MainPage}/>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
