/* eslint-disable no-undef */
import MenuScene from '../src/scenes/MenuScene';

test('MenuScene is a subclass of Phaser.Scene', () => {
  expect(MenuScene).toBeSubclassOf(Phaser.Scene);
});