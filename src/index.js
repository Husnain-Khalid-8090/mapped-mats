import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './scss/styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './app/router/router';
import { store, persistor } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider >
  , document.getElementById('root')
);
