import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'player-ship-laser');
    this.body.velocity.y = -200;
  }
}
