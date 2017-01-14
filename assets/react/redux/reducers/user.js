import update from 'immutability-helper';

export default function user(state = {}, action) {
  switch (action.type) {
    case 'USER_AUTH':
      return update(state, {
        authenticated: { $set: true },
      });
    case 'USER_NO_AUTH':
      return update(state, {
        authenticated: { $set: false },
      });
    case 'UPDATE_USER_DETAILS':
      return update(state, {
        fbId: { $set: action.fbId },
      });
    case 'UPDATE_USER_FB_FRIENDS':
      return update(state, {
        friends: { $set: action.friends },
      });
    case 'UPDATE_USER_GAME_STATE':
      return update(state, {
        gameState: {
          [action.gameId]: {
            $set: action.gameState,
          },
        },
      });
    default:
      return state;
  }
}
