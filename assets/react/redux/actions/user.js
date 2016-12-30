import firebase from '../../firebase/Firebase';
import { getCurrentUser as getCurrentFbUser } from '../../utils/fb';

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
 * @param  {string} fbId  The user's Facebook ID
 * @return {Object} The action data
 */
export function updateUserDetails(fbId) {
  return {
    type: 'UPDATE_USER_DETAILS',
    fbId,
  };
}

/**
 * Verify authentication with Firebase by starting
 * an authentication state listener
 * @return {function} The function to execute which gets redux-thunk
 *                    params to use for dispatching
 */
export function verifyAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
        dispatch(updateUserDetails(fbUser.id));
        if (callback) {
          callback();
        }
      });
  };
}
