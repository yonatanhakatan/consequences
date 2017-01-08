import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Game from '../Game';

storiesOf('Game', module)
  .add('regular state', () => (
    <Game />
  ));
