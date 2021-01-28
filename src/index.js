import 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import MenuScene from './scenes/MenuScene';
import './style.css';
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


const formStringElement = `
<div class="form-container">
    <h3>EL GALACTICO SHOOTING GAME</h3>
    <form name="playerNameForm">
        <div>
            <input type="text" name="player-name" placeholder="Enter player's name" required />
        </div>
        <button class="btn">Proceed to Game</button>
    </form>
</div>
`;

document.body.innerHTML = formStringElement;

const { playerNameForm } = document;
playerNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const playerName = e.target.elements['player-name'].value;
  console.log(playerName);
  document.body.innerHTML = '';
  setTimeout(() => window.game = new Game(), 1000);
});

