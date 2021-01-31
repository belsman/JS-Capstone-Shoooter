/* eslint-disable no-undef */
import Entity from '../src/entities/Entity';

test('Entity is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Entity).toBeSubclassOf(Phaser.GameObjects.Sprite);
});