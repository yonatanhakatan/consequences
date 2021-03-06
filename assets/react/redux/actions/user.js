import firebase from '../../firebase/Firebase';
import _ from 'lodash';
import {
  getCurrentUser as getCurrentFbUser,
  getInvitableFriends as getInvitableFbFriends,
  getAppFriends as getAppFbFriends,
} from '../../utils/fb';

/**
 * Action for when the user has been
 * authenticated successfully by Firebase
 * @return {Object} The action data
 */
export function userAuth() {
  return {
    type: 'USER_AUTH',
  };
}

/**
 * Action for when the user has
 * failed authentication by Firebase
 * @return {Object} The action data
 */
export function userNoAuth() {
  return {
    type: 'USER_NO_AUTH',
  };
}

/**
 * Action to update the current user's details
 * @param  {Object} user  The user object
 * @return {Object} The action data
 */
export function updateUserDetails(user) {
  return {
    type: 'UPDATE_USER_DETAILS',
    user,
  };
}

/**
 * Action to update the current user's facebook friends
 * @param  {Array} friends The array of the user's facebook friends
 * @return {Object} The action data
 */
export function updateUserFbFriends(friends) {
  return {
    type: 'UPDATE_USER_FB_FRIENDS',
    friends,
  };
}

/**
 * Update the game state for the current user's game.
 * The game state refers to various points in the game like if their
 * turn has just been played or if their turn has just ended
 * @param  {string} gameId    The unique identifier for the game
 * @param  {string} gameState The new game state
 * @return {Object} The action data
 */
export function updateUserGameState(gameId, gameState) {
  return {
    type: 'UPDATE_USER_GAME_STATE',
    gameId,
    gameState,
  };
}


/**
 * Verify authentication with Firebase by starting
 * an authentication state listener
 * @param  {Function} initCallback Callback to call after firebase has
 *                                 intialiased a user
 * @return {function} The function to execute which gets redux-thunk
 *                    params to use for dispatching
 */
export function verifyAuth(initCallback) {
  let isInit = false;

  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!isInit) {
          initCallback();
          isInit = true;
        }
        dispatch(userAuth());
      } else {
        dispatch(userNoAuth());
        localStorage.removeItem('fbAccessToken');
      }
    });
  };
}

/**
 * Get the user's details
 * @param  {Function} (optional) callback Callback to call after
 *                                        the details have been retrieved
 * @return {function} The function to execute which gets redux-thunk
 *                    params to use for dispatching
 */
export function getUserDetails(callback = null) {
  return (dispatch) => {
    getCurrentFbUser()
      .then((fbUser) => {
        dispatch(updateUserDetails(fbUser));
        if (callback) {
          callback();
        }
      });
  };
}

/**
 * Get the user's Facebook friends. This is a combination
 * of friends who have and haven't installed the app.
 * @return {function} The function to execute which gets redux-thunk
 *                    params to use for dispatching
 */
export function getFbFriends() {
  return (dispatch) => {
    Promise.all([getInvitableFbFriends(), getAppFbFriends()])
      .then((data) => {
        let inviteableFriends = data[0].data;
        let appFriends = data[1].data;

        inviteableFriends = inviteableFriends.map((_friend) => {
          const friend = _friend;
          friend.appInstalled = false;

          return friend;
        });

        appFriends = appFriends.map((_friend) => {
          const friend = _friend;
          friend.appInstalled = true;

          return friend;
        });

        dispatch(updateUserFbFriends(_.sortBy(inviteableFriends.concat(appFriends), 'name')));
      });
  };
}
