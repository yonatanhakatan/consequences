import update from 'immutability-helper';

export default function auth(state = {}, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return update(state, {
        authenticated: { $set: true },
      });
    case 'AUTH_SIGNOUT':
      return update(state, {
        authenticated: { $set: false },
      });
    default:
      return state;
  }
}
