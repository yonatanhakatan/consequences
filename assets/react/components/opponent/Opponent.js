import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Opponent.scss';

const Opponent = () => {
  const classes = classNames({
    opponent: true,
  });

  return (
    <div styleName={classes}>
      Please choose your opponent
    </div>
  );
};

export default cssModules(Opponent, styles, { allowMultiple: true });
