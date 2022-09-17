import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { App } from './components/App/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
