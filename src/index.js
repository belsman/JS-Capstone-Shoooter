import 'phaser';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import config from './Config/config';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        // this.scene.add('Boot', BootScene);
        // this.scene.add('Preloader', PreloaderScene);
        // this.scene.add('Title', TitleScene);
        // this.scene.add('Options', OptionsScene);
        // this.scene.add('Credits', CreditsScene);
        this.scene.add('MainScene', MainScene);
        this.scene.add('GameOverScene', GameOverScene)
        this.scene.start('MainScene');
    }
}

window.game = new Game();
