import Entity from './Entity';

export default class EnemyLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, 'enemy-ship-laser');
      this.body.velocity.y = 200;
    }
}
