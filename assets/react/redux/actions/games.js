import firebase from '../../firebase/Firebase';
import { browserHistory } from 'react-router';

/**
 * The actual create game action which gets dispatched
 * @param  {string} gameId   The unique identifier for the game
 * @param  {Object} gameData The game data to create with
 * @return {Object} The action data
 */
function createGameAction(gameId, gameData) {
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
    dispatch(createGameAction(gameId, { hostFbId, opponentFbId, turn: hostFbId }));

    firebase.post(`games/${gameId}`, {
      data: getState().games[gameId],
    }).then(() => {
      firebase.push(`users/${hostFbId}/games`, {
        data: gameId,
      }).then(() => {
        firebase.push(`users/${opponentFbId}/games`, {
          data: gameId,
        });

        browserHistory.push(`/auth/game/${gameId}`);
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
          dispatch(createGameAction(gameId, gameData));
        });
      });
    });
  };
}

/**
 * The actual update game value action which gets dispatched when a
 * user submits their turn
 * @param  {string} gameId   The unique identifier for the game
 * @param  {string} gameKey  The key for the game to update e.g. manSaid
 * @param  {string} gameVal  The value that the user has entered
 * @return {Object} The action data
 */
function updateGameValueAction(gameId, gameKey, gameVal, gameNextTurn) {
  return {
    type: 'UPDATE_GAME_VALUE',
    gameId,
    gameKey,
    gameVal,
    gameNextTurn,
  };
}

/**
 * Update a game value after a user submits their turn
 * @param  {string} gameId   The unique identifier for the game
 * @param  {string} gameKey  The key for the game to update e.g. manSaid
 * @param  {string} gameVal  The value that the user has entered
 * @return {function} The function to execute which gets
 *                    redux-thunk params to use for dispatching
 */
export function updateGameValue(gameId, gameKey, gameVal) {
  return (dispatch, getState) => {
    const currentGameData = getState().games[gameId];
    const currentTurn = currentGameData.turn;
    const currentUserFbId = getState().user.fbId;

    // Make sure it's the current user's turn
    if (currentTurn !== currentUserFbId) {
      return false;
    }

    const { hostFbId, opponentFbId } = currentGameData;

    let gameNextTurn = hostFbId;
    if (currentTurn === hostFbId) {
      gameNextTurn = opponentFbId;
    }

    const dispatcher = dispatch(updateGameValueAction(gameId, gameKey, gameVal, gameNextTurn));

    // Synch with Firebase
    firebase.post(`games/${gameId}`, {
      data: getState().games[gameId],
    });

    return dispatcher;
  };
}
