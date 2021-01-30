export default (player, enemy) => {
  if (!player.getData('isDead')
        && !enemy.getData('isDead')) {
    player.explode(false);
    enemy.explode(true);
    player.onDestroy();
  }
};