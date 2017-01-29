import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Game from '../Game';
import { INITIAL_CATEGORIES, FINAL_CATEGORIES } from '../../../mocks/categories';

storiesOf('Game', module)
  .add('User\'s Turn', () => (
    <Game gameState="userTurn" categories={INITIAL_CATEGORIES} onEntrySubmit={action('Entry Submit')} />
  ))
  .add('Turn just played', () => (
    <Game gameState="turnJustPlayed" categories={INITIAL_CATEGORIES} onEntrySubmit={action('Entry Submit')} />
  ))
  .add('Turn Ended', () => (
    <Game gameState="turnEnded" />
  ))
  .add('Not User\'s turn', () => (
    <Game gameState="notUserTurn" />
  ))
  .add('Game Finished', () => (
    <Game gameState="finished" categories={FINAL_CATEGORIES} onEntrySubmit={action('Entry Submit')} />
  ))
  .add('Initialising', () => (
    <Game />
  ));
