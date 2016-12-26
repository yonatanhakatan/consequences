import { configure, addDecorator } from '@kadira/storybook';
import React from 'react';

const req = require.context('../assets/react/components', true, /[A-Za-z-\/]+\/stories\/[A-Za-z-]+\.js?$/);

function loadStories() {
  req.keys().forEach(req);
}

const wrapperDecorator = (story) => (
  <div className="storybook">
    {story()}
  </div>
);
addDecorator(wrapperDecorator);

configure(loadStories, module);
