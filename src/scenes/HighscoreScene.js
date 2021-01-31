import Phaser from 'phaser';
import api from '../scores-api';

export default class Highscore extends Phaser.Scene {
  constructor() {
    super('HighsceneScene');
  }

  create() {
    this.menuButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.menuButton, 4);

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

    this.displayName("Top 3 Highscores", 1, 32);

    api.fectchScores().then(scores => {
      const top5 = scores.result.sort((a, b) => b.score - a.score).slice(0, 3);

      top5.forEach( (player, index) => {
        let textOffset = ((index + 1) * 100);
        let displayText = `${player.user}\t\t\t${player.score}`;
        this.displayName(displayText, textOffset, 18); 
      });
    }).catch(e => e);
  }

  centerButton(gameObject) {
    const x = this.game.config.width / 2;
    const y = 50;
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

  displayName(displayText, offset, fontSize) {
    let x = this.game.config.width * 0.5;
    let y = 100 + offset;
    this.name = this.add.text(x, y, displayText, {
        fontFamily: 'monospace',
        fontSize: fontSize,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    this.name.setOrigin(0.5);
  }
}
