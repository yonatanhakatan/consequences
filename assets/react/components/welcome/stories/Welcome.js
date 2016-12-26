import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Welcome from '../Welcome';

storiesOf('Welcome', module)
  .add('regular state', () => (
    <Welcome />
  ));
