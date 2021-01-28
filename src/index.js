import 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import MenuScene from './scenes/MenuScene';
import config from './Config/config';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('MenuScene', MenuScene);
        this.scene.add('MainScene', MainScene);
        this.scene.add('GameOverScene', GameOverScene)
        this.scene.start('Boot');
    }
}

window.game = new Game();
