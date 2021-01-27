import Phaser from 'phaser';
import backgroundImg from '../assets/space-background.png';
import playerShipImg from '../assets/player-ship.png';
import playerLaserImg from '../assets/sprLaserPlayer.png';
import enemyShipImg from '../assets/enemy.png';
import enemyLaserImg from '../assets/sprLaserEnemy0.png';
import Player from '../entities/Player';
import EnemyShip from '../entities/Enemy';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload (){
        this.load.image('background', backgroundImg);

        this.load.image('player-ship', playerShipImg);
        this.load.image("player-ship-laser", playerLaserImg);

        this.load.image('enemy-ship', enemyShipImg);
        this.load.image('enemy-ship-laser', enemyLaserImg);
    }
    
    create() {
        this.add.image(400, 300, 'background');
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player-ship'
        );

        this.playerLasers = this.add.group();
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                let enemy = null;
        
                if (Phaser.Math.Between(0, 10) >= 6) {
                  enemy = new EnemyShip(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                  );
                }
            
                if (enemy !== null) {
                  this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
    }

    update() {
        this.player.update();

        if (this.cursors.up.isDown) {
            this.player.moveUp();
        } else if (this.cursors.down.isDown) {
            this.player.moveDown();
        }

        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        } else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }

        if (this.keySpace.isDown) {
            this.player.setData("isShooting", true);
        } else {
            this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
            this.player.setData("isShooting", false);
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
      
            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
            
                if (enemy) {
                  if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                  }
            
                  enemy.destroy();
                }
            
            }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
      
            if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight) {
              if (laser) {
                laser.destroy();
              }
            }
        }
      
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
      
            if (laser.x < -laser.displayWidth ||
              laser.x > this.game.config.width + laser.displayWidth ||
              laser.y < -laser.displayHeight * 4 ||
              laser.y > this.game.config.height + laser.displayHeight) {
              if (laser) {
                laser.destroy();
              }
            }
        }
    }
};
