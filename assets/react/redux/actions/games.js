import firebase from '../../firebase/Firebase';

/**
 * The actual create game action which gets dispatched
 * @param  {string} gameId   The unique identifier for the game
 * @param  {Object} gameData The game data to create with
 * @return {Object} The action data
 */
export function createGame(gameId, gameData) {
  return {
    type: 'CREATE_GAME',
    gameId,
    gameData,
  };
}

/**
 * Initialise a new game
 * @param  {string} opponentFbId The facebook ID of the opponent
 * @return {function} The function to execute which gets redux-thunk
 *                    params to use for dispatching
 */
export function initGame(opponentFbId) {
  return (dispatch, getState) => {
    const gameId = Math.random().toString(36).substr(2, 9);
    const hostFbId = getState().user.fbId;
    dispatch(createGame(gameId, { hostFbId, opponentFbId, turn: hostFbId }));

    firebase.post(`games/${gameId}`, {
      data: getState().games[gameId],
    }).then(() => {
      firebase.push(`users/${hostFbId}/games`, {
        data: gameId,
      }).then(() => {
        firebase.push(`users/${opponentFbId}/games`, {
          data: gameId,
        });
      });
    });
  };
}

/**
 * Retrieve all the current user's games from Firebase
 * @return {function} The function to execute which gets
 *                    redux-thunk params to use for dispatching
 */
export function retrieveGames() {
  return (dispatch, getState) => {
    const userFbId = getState().user.fbId;

    firebase.fetch(`users/${userFbId}/games`, {
      context: {},
      asArray: true,
    }).then((games) => {
      games.forEach((gameId) => {
        firebase.fetch(`games/${gameId}`, {
          context: {},
          asArray: false,
        }).then((gameData) => {
          dispatch(createGame(gameId, gameData));
        });
      });
    });
  };
}
