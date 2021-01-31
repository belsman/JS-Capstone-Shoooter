import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

    this.highButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.highButton);

    this.highButtonText = this.add.text(0, 0, 'Highscore', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.highButtonText, this.highButton);

    this.highButton.on('pointerdown', () => {
      this.scene.start('HighsceneScene');
    });
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
