import firebase from '../../firebase/Firebase';

export function authUser() {
  return {
    type: 'AUTH_USER',
  };
}

export function signOutUser() {
  return {
    type: 'AUTH_SIGNOUT',
  };
}

export function verifyAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
        localStorage.removeItem('fbAccessToken');
      }
    });
  };
}
