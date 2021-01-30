import Phaser from 'phaser';
import './style.css';
import state from './state';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import MenuScene from './scenes/MenuScene';
import config from './Config/config';
import formStringElement from './player-name-form';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('MainScene', MainScene);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.start('Boot');
  }
}

document.body.innerHTML = formStringElement;

const { playerNameForm } = document;
playerNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const playerName = e.target.elements['player-name'].value;
  state.user = playerName;
  document.body.innerHTML = '';
  setTimeout(() => {
    window.game = new Game();
  }, 1000);
});
