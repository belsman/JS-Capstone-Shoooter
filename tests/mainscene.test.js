/* eslint-disable no-undef */
import MainScene from '../src/scenes/MainScene';

test('MainScene is a subclass of Phaser.Scene', () => {
  expect(MainScene).toBeSubclassOf(Phaser.Scene);
});