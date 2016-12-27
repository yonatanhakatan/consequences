import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './redux/store';

import App from './components/app/App';
import WelcomeContainer from './components/welcome/WelcomeContainer';
import OpponentContainer from './components/opponent/OpponentContainer';

import redirectIfNoAuth from './utils/auth';

import '../css/screen.scss';

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={redirectIfNoAuth} onChange={redirectIfNoAuth}>
        <IndexRoute component={WelcomeContainer} />
        <Route path="/auth">
          <Route path="opponent" component={OpponentContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
