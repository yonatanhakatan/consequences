import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import FriendSelectorContainer from '../friendselector/FriendSelectorContainer';
import styles from './Opponent.scss';

const Opponent = (props) => {
  const classes = classNames({
    opponent: true,
  });

  return (
    <div styleName={classes}>
      Please choose your opponent:
      <FriendSelectorContainer friends={props.friends} selectFriend={props.selectFriend} />
    </div>
  );
};

Opponent.propTypes = {
  friends: React.PropTypes.array,
  selectFriend: React.PropTypes.func,
};

export default cssModules(Opponent, styles, { allowMultiple: true });
