import { configure } from '@kadira/storybook';

const req = require.context('../assets/react/components', true, /[A-Za-z-\/]+\/stories\/[A-Za-z-]+\.js?$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
