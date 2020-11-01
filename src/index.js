import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import pl from './locale/pl.json';
import App from './app/App';
import { AuthContextProvider } from './app/store/reducers/auth';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale='pl' messages={pl}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('app'));
