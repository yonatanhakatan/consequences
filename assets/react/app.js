import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './redux/store';

import App from './components/app/App';
import TestContainer from './components/test/TestContainer';

import '../css/screen.scss';

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={TestContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
