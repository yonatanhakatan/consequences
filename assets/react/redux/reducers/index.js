import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import games from './games';

const rootReducer = combineReducers({
  user,
  games,
  routing: routerReducer,
});

export default rootReducer;
