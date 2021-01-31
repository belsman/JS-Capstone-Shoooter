/* eslint-disable no-undef */
import BootScene from '../src/scenes/BootScene';

test('BootScene is a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});
