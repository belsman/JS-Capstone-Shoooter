import Phaser from 'phaser';

import backgroundImg from '../assets/space-background1.png';
import playerShipImg from '../assets/player-ship.png';
import playerLaserImg from '../assets/sprLaserPlayer.png';
import enemyShipImg from '../assets/enemy.png';
import enemyLaserImg from '../assets/sprLaserEnemy0.png';
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
import blueButton1 from '../assets/blue_button02.png';
import blueButton2 from '../assets/blue_button03.png';
import sprBtnRestart from '../assets/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/sprBtnRestartHover.png';
import sprBtnRestartDown from '../assets/sprBtnRestartDown.png';

import laserSoundEffect from '../assets/sndLaser.wav';
import explosion from '../assets/sndExplode0.wav';
import explosion1 from '../assets/sndExplode1.wav';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('background', backgroundImg);

    this.load.image('player-ship', playerShipImg);
    this.load.image('player-ship-laser', playerLaserImg);

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

    this.load.audio('laserSound', laserSoundEffect);
    this.load.audio('explosion', explosion);
    this.load.audio('explosion1', explosion1);

    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);

    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.image('sprBtnRestartHover', sprBtnRestartHover);
    this.load.image('sprBtnRestartDown', sprBtnRestartDown);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('MenuScene');
    }
  }
}
