import React from 'react';

import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Main.scss';

const Main = (props) => {
  const classes = classNames({
    main: true,
  });

  return (
    <div styleName={classes}>
      {React.cloneElement(props.children, props)}
    </div>
  );
};

Main.propTypes = {
  children: React.PropTypes.any,
};

export default cssModules(Main, styles, { allowMultiple: true });
