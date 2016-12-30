import firebase from '../firebase/Firebase';
import { browserHistory } from 'react-router';

let firebaseLoaded = false;

/**
 * Check if the Firebase user is authenticated and redirect them
 * to the homepage if not
 */
const checkFirebaseAuthUser = () => {
  const isAuth = firebase.auth().currentUser;

  if (!isAuth) {
    browserHistory.push('/');
  }
};

/**
 * Redirect the user away from the page if it's a protected route
 * and the user has invalid credentials
 * @param  {Object} state1 Depending on the circumstance, this will either be
 *                         the previous state or the current state
 * @param  {Object} state2 Depending on the circumstance, this will either be
 *                         the previous state or the current state
 */
const redirectIfNoAuth = (state1, state2) => {
  // When this function is called by react-router's onEnter method, the
  // current state will be state1. If it's onChange calling this method, then
  // the current state is state2. We check state2 for the 'location' property,
  // and if it's not there, we assume its state1 that we want.
  const stateToUse = state2.location ? state2 : state1;

  // The protected routes are prefixed with '/auth/'
  if (stateToUse.location.pathname.substr(0, 6) === '/auth/') {
    // When the browser is first loaded, firebase hasn't loaded yet, so
    // we wait for the state change before doing our checks
    if (!firebaseLoaded) {
      const onAuthStateChanged = firebase.auth().onAuthStateChanged(() => {
        firebaseLoaded = true;
        // unsubscribe from onAuthStateChanged listener
        onAuthStateChanged();
        // do our checks
        checkFirebaseAuthUser();
      });
    } else {
      // In this situation, we know Firebase has already loaded, so we
      // can do our checks straight away
      checkFirebaseAuthUser();
    }
  }
};

/**
 * Perform a Facebook login via Firebase
 * @return {Object} A Promise object
 */
export function fbLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_friends');

  return firebase.auth().signInWithPopup(provider)
    .then((success) => {
      localStorage.setItem('fbAccessToken', success.credential.accessToken);
    });
}

export default redirectIfNoAuth;
