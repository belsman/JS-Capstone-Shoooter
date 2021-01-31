export default (scene) => (playerLaser, enemy) => {
  if (enemy) {
    if (enemy.onDestroy !== undefined) {
      enemy.onDestroy();
    }

    enemy.explode(true);
    scene.score += 1;
    playerLaser.destroy();
    scene.scoreText.setText(`Score: ${scene.score}`);
  }
};
