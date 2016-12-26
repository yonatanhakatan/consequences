import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Test from '../Test';

storiesOf('Test', module)
  .add('regular state', () => (
    <Test />
  ));
