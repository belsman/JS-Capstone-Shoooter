import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './Enemy-laser';

export default class Enemy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-ship', 'EnemyShip');
    this.body.velocity.y = Phaser.Math.Between(30, 80);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const laser = new EnemyLaser(
          scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}