/* eslint-disable no-undef */
import GameoverScene from '../src/scenes/GameOverScene';

test('GameoverScene is a subclass of Phaser.Scene', () => {
  expect(GameoverScene).toBeSubclassOf(Phaser.Scene);
});
