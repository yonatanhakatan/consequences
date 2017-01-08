import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './redux/store';

import App from './components/app/App';
import GameContainer from './components/game/GameContainer';
import OpponentContainer from './components/opponent/OpponentContainer';
import WelcomeContainer from './components/welcome/WelcomeContainer';

import redirectIfNoAuth from './utils/auth';

import '../css/screen.scss';

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={redirectIfNoAuth} onChange={redirectIfNoAuth}>
        <IndexRoute component={WelcomeContainer} />
        <Route path="/auth">
          <Route path="opponent" component={OpponentContainer} />
          <Route path="game/:gameId" component={GameContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
