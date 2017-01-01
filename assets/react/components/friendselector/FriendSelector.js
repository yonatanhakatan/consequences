import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './FriendSelector.scss';

const FriendSelector = (props) => {
  const classes = classNames({
    friendselector: true,
  });

  return (
    <ul styleName={classes}>
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
  );
};

FriendSelector.propTypes = {
  friends: React.PropTypes.array,
  selectFriend: React.PropTypes.func,
};

export default cssModules(FriendSelector, styles, { allowMultiple: true });
