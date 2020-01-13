import {
  KEY_RIGHT,
  KEY_LEFT,
  KEY_TOP,
  KEY_BOTTOM,
  KEY_SPACE,
  SPEED,
  SHOOT_DISTANCE,
} from './consts';
import {
  randomEnemy,
} from './helpers';

export function updater(opts) {
  const {renderer, scene, camera, clock, enemies, bullets, hero, defence} = opts;

  requestAnimationFrame(() => updater(opts));
  const delta = clock.getDelta();
  enemies.forEach((enemy, i) => {
    if (!enemy.checkColision(hero)) {
      enemy._model.translateY(-(SPEED / 5) * delta);
    } else {
      enemies.splice(i, 1);
      scene.remove(enemy._model)

      defenceScore = defenceScore - 5;
      defenceElement.innerHTML = defenceScore;
      randomEnemy(scene, enemies);
    }

    if (enemy.checkColision(defence)) {
      enemies.splice(i, 1);
      scene.remove(enemy._model)

      const enemy = randomEnemy(enemyModel.clone());
      scene.add(enemy._model);
      enemies.push(enemy);
    }
  });

  bullets.forEach((bullet, i) => {
    if (bullet.getPosition().x > SHOOT_DISTANCE) {
      bullets.splice(i, 1);
      scene.remove(bullet._model)
    } else {
      bullet.translateX(SPEED * delta);
      enemies.forEach((enemy, i) => {
        if (enemy.checkColision(bullet)) {

          bullets.splice(i, 1);
          scene.remove(bullet._model)

          enemies.splice(i, 1);
          scene.remove(enemy._model)

          kills++;
          scoreElement.innerHTML = kills;

          randomEnemy(scene, enemies);
        }
      });
    }
  });


  renderer.update();
};
