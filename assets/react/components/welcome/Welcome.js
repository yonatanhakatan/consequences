import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Welcome.scss';

const Welcome = () => {
  const classes = classNames({
    welcome: true,
  });

  return (
    <div styleName={classes}>
      <div>
        <button>Start Game</button>
        <button>Join Game</button>
      </div>
    </div>
  );
};

export default cssModules(Welcome, styles, { allowMultiple: true });
