import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Opponent from '../Opponent';

storiesOf('Opponent', module)
  .add('regular state', () => (
    <Opponent />
  ));
