import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Welcome.scss';

const Welcome = (props) => {
  const classes = classNames({
    welcome: true,
  });

  return (
    <div styleName={classes}>
      <div>
        <button onClick={props.startGame}>Start Game</button>
        <button>Join Game</button>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  startGame: React.PropTypes.func,
};

export default cssModules(Welcome, styles, { allowMultiple: true });
