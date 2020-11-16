import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './app/store/store';
import { IntlProvider } from 'react-intl';
import pl from './locale/pl.json';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale='pl' messages={pl}>
        <Provider store={store}>
          <App />
        </Provider>
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('memesis-app'));
