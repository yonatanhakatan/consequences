import { APP_ID } from '../constants/fb';

let currentUser;

/**
 * Initialise the Facebook SDK
 * @return {[type]} [description]
 */
export const initFB = () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: APP_ID,
      xfbml: true,
      version: 'v2.8',
    });
    window.FB.AppEvents.logPageView();
  };

  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    const js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

/**
 * Helper which calls supplied callback only after Fb SDK is ready
 * @param  {Function} callback The callback to execute
 */
export const waitForSdk = (callback) => {
  if (window.FB) {
    callback();
  } else {
    setTimeout(callback, 1000);
  }
};

/**
 * Get the current user details from Facebook
 * @return {Object} Promise object
 */
export const getCurrentUser = () =>
  new Promise((resolve) => {
    if (!currentUser) {
      waitForSdk(() => {
        window.FB.api('/me', { access_token: localStorage.getItem('fbAccessToken') }, (user) => {
          currentUser = user;
          resolve(currentUser);
        });
      });
    } else {
      resolve(currentUser);
    }
  });

/**
 * Show a Facebook friend selector dialog
 * @return {Object} Promise object
 */
export const showFriendSelector = () =>
  new Promise((resolve) => {
    waitForSdk(() => {
      window.FB.ui({ method: 'apprequests', message: 'Hello', max_recipients: '1' }, (response) => {
        resolve(response);
      });
    });
  });
