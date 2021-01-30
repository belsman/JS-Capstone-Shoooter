export default (scene) => (playerLaser, enemy) => {
  if (enemy) {
    if (enemy.onDestroy !== undefined) {
      enemy.onDestroy();
    }

    enemy.explode(true);
    playerLaser.destroy();
    scene.score += 1;
    scene.scoreText.setText(`Score: ${scene.score}`);
  }
};
