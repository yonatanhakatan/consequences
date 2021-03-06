import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Opponent from '../Opponent';
import { FRIENDS } from '../../../mocks/friends';

storiesOf('Opponent', module)
  .add('regular state', () => (
    <Opponent friends={FRIENDS} selectFriend={action('Select Friend')} />
  ));
