import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Opponent.scss';

const Opponent = (props) => {
  const classes = classNames({
    opponent: true,
  });

  return (
    <div styleName={classes}>
      Please choose your opponent:
      <ul>
        {
          props.friends && props.friends.map((friend) => (
            <li key={friend.id}>
              <button onClick={() => { props.selectFriend(friend); }}>
                <div>{friend.name}</div>
                <img src={friend.picture.data.url} alt={friend.name} />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

Opponent.propTypes = {
  friends: React.PropTypes.array,
  selectFriend: React.PropTypes.func,
};

export default cssModules(Opponent, styles, { allowMultiple: true });
