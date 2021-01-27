import 'phaser';
import sprBtnRestart from '../assets/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/sprBtnRestartHover.png';
import sprBtnRestartDown from '../assets/sprBtnRestartDown.png';



export default class GameScene extends Phaser.Scene {
    constructor () {
        super('GameOverScene');
    }

    preload () {
        this.load.image('sprBtnRestart', sprBtnRestart);
        this.load.image('sprBtnRestartHover', sprBtnRestartHover);
        this.load.image('sprBtnRestartDown', sprBtnRestartDown);
    }
      
    create () {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
        );

        this.btnRestart.setInteractive();

        this.btnRestart.on("pointerover", function() {
          this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        }, this);
    
        this.btnRestart.on("pointerout", function() {
          this.setTexture("sprBtnRestart");
        });
    
        this.btnRestart.on("pointerdown", function() {
          this.btnRestart.setTexture("sprBtnRestartDown");
        }, this);
    
        this.btnRestart.on("pointerup", function() {
          this.btnRestart.setTexture("sprBtnRestart");
          this.scene.start("MainScene");
        }, this);
    }
};
