import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Test.scss';

const Test = () => {
  const classes = classNames({
    test: true,
  });

  return (
    <div styleName={classes}>
      <span>Test Component</span>
    </div>
  );
};

Test.propTypes = {
  prizeCards: React.PropTypes.array,
};

export default cssModules(Test, styles, { allowMultiple: true });
