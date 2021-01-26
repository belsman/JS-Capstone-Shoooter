import Phaser from 'phaser';
import backgroundImg from '../assets/space-background.png';
import playerShip from '../assets/player-ship.png';
import Player from '../entities/Player';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload (){
        this.load.image('background', backgroundImg);
        this.load.image('player-ship', playerShip);
    }
    
    create() {
        this.add.image(400, 300, 'background');
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player-ship'
        );

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.rotateAntiClockwise();
        } else if (this.cursors.right.isDown) {
            this.player.rotateClockwise();
        }

        if (this.cursors.up.isDown) {
            console.log("Thrust the JET Forward");
        }
    }
};
