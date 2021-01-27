import Phaser from 'phaser';
import backgroundImg from '../assets/space-background1.png';
import playerShipImg from '../assets/player-ship.png';
import playerLaserImg from '../assets/sprLaserPlayer.png';
import enemyShipImg from '../assets/enemy.png';
import enemyLaserImg from '../assets/sprLaserEnemy0.png';
import Player from '../entities/Player';
import EnemyShip from '../entities/Enemy';
import laserSoundEffect from '../assets/sndLaser.wav';
import explosion from '../assets/sndExplode0.wav';
import explosion1 from '../assets/sndExplode1.wav'

import ScrollingBackground from '../entities/scrolling_background';

import blastImg1 from '../assets/Ship1_Explosion_001.png';
import blastImg2 from '../assets/Ship1_Explosion_003.png';
import blastImg3 from '../assets/Ship1_Explosion_008.png';
import blastImg4 from '../assets/Ship1_Explosion_009.png';
import blastImg5 from '../assets/Ship1_Explosion_012.png';
import blastImg6 from '../assets/Ship1_Explosion_013.png';
import blastImg7 from '../assets/Ship1_Explosion_014.png';
import blastImg8 from '../assets/Ship1_Explosion_017.png';
import blastImg9 from '../assets/Ship1_Explosion_019.png';
import blastImg10 from '../assets/Ship1_Explosion_020.png';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.score = 0;
    }

    preload (){
        this.load.image('background', backgroundImg);

        this.load.image('player-ship', playerShipImg);
        this.load.image("player-ship-laser", playerLaserImg);

        this.load.image('enemy-ship', enemyShipImg);
        this.load.image('enemy-ship-laser', enemyLaserImg);

        this.load.image('blast0', blastImg1);
        this.load.image('blast1', blastImg2);
        this.load.image('blast2', blastImg3);
        this.load.image('blast3', blastImg4);
        this.load.image('blast4', blastImg5);
        this.load.image('blast5', blastImg6);
        this.load.image('blast6', blastImg7);
        this.load.image('blast7', blastImg8);
        this.load.image('blast8', blastImg9);
        this.load.image('blast9', blastImg10);

        this.load.audio("laserSound", laserSoundEffect);
        this.load.audio("explosion", explosion);
        this.load.audio("explosion1", explosion1);
    }
    
    create() {
        this.backgrounds = [];
        for (let i = 0; i < 5; i++) {
            let bg = new ScrollingBackground(this, "background", i * 10);
            this.backgrounds.push(bg);
        }

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player-ship'
        );

        this.scoreText = this.add.text(10, 10, 'score: 0', { fontSize: '20px', fill: '#fff' });

        this.sfx = {
            explosions: [
              this.sound.add("explosion"),
              this.sound.add("explosion1")
            ],
            laser: this.sound.add("laserSound")
        };

        this.playerLasers = this.add.group();
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();

        this.anims.create({
            key: 'enemy-ship-explosion',
            frames: [
                { key: 'blast0' },
                { key: 'blast1' },
                { key: 'blast2' },
                { key: 'blast3' },
                { key: 'blast5' },
                { key: 'blast6' },
                { key: 'blast7' },
                { key: 'blast8' },
                { key: 'blast9' },
            ],
            frameRate: 10,
            repeat: 0
        });    

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

        this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }

                enemy.explode(true);
                playerLaser.destroy();
                this.score += 1;
                this.scoreText.setText('Score: ' + this.score);
            }
        });

        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
              player.explode(false);
              enemy.explode(true);
              player.onDestroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
              player.explode(false);
              laser.destroy();
              player.onDestroy();
            }
        });
    }

    update() {

        for (let i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }

        if (!this.player.getData("isDead")) {
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
        }

        for (const enemy of this.enemies.getChildren()) {
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

        for (const laser of this.enemyLasers.getChildren()) {
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
      
        for (const laser of this.playerLasers.getChildren()) {
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
