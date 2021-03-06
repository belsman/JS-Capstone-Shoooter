export default (groups, scene) => {
  groups.forEach(item => {
    item.update();

    if (item.x < -item.displayWidth
            || item.x > scene.game.config.width + item.displayWidth
            || item.y < -item.displayHeight * 4
            || item.y > scene.game.config.height + item.displayHeight) {
      if (item) {
        if (item.onDestroy !== undefined) {
          item.onDestroy();
        }

        item.destroy();
      }
    }
  });
};
