import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import pl from './locale/pl.json';
import './index.css';
import App from './app/App';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale="pl" messages={pl}>
        <App/>
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
