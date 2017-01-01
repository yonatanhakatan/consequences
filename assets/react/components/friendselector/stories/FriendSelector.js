import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FriendSelector from '../FriendSelector';
import { FRIENDS } from '../../../mocks/friends';

storiesOf('FriendSelector', module)
  .add('regular state', () => (
    <FriendSelector friends={FRIENDS} selectFriend={action('Select Friend')} />
  ));
