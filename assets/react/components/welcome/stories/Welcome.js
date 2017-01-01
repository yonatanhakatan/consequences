import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Welcome from '../Welcome';

storiesOf('Welcome', module)
  .add('regular state', () => (
    <Welcome startGame={action('Start Game')} />
  ));
