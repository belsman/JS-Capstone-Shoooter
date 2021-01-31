import Phaser from 'phaser';
import api from '../scores-api';

export default class Highscore extends Phaser.Scene {
  constructor() {
    super('HighsceneScene');
  }

  create() {
    this.menuButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.menuButton, 2);

    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

    api.fectchScores().then(scores => {
       const top5 = scores["result"].sort( (a, b) => b.score - a.score).slice(0, 3);
       console.log(top5);
    }).catch(e => e);
  }

  centerButton(gameObject, offset = 0) {
    const x = this.game.config.width / 2;
    const y = this.game.config.height / 2 - offset * 100;
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(x, y, this.game.config.width, this.game.config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
    return this;
  }
}
