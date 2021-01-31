/* eslint-disable no-undef */
import PreloaderScene from '../src/scenes/PreloaderScene';

test('Preloader is a subclass of Phaser.Scene', () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});
