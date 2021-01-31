/* eslint-disable no-undef */

import HighscoreScene from '../src/scenes/HighscoreScene';

test('HighscoreScene is a subclass of Phaser.Scene', () => {
  expect(HighscoreScene).toBeSubclassOf(Phaser.Scene);
});