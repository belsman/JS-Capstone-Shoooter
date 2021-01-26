import Phaser from 'phaser';
import skyImg from '../assets/sky.png';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload (){
        this.load.image('sky', skyImg);
    }
    
    create() {
        this.add.image(400, 300, 'sky');
    }

    update() {

    }
};
