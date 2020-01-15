import {
  SPEED,
  SHOOT_DISTANCE,
} from './consts';
import {
  randomEnemy,
} from './helpers';

export function updater(opts) {
  const {renderer, scene, clock, enemies, bullets, hero, defence, enemyModel} = opts;

  if (defence.isDead() || hero.isDead()) {
    return;
  }

  requestAnimationFrame(() => updater(opts));
  const delta = clock.getDelta();
  console.log(delta % 48 === 0);
  enemies.forEach((enemy, i) => {
    if (!enemy.checkColision(hero)) {
      enemy._model.translateX(-(SPEED / 5) * delta);
    } else {
      scene.remove(enemy._model);
      enemies.splice(i, 1);
      hero.handleShipAttacked();

      const newEnemy = randomEnemy(enemyModel.clone());
      scene.add(newEnemy._model);
      enemies.push(newEnemy);
    }

    if (enemy.checkColision(defence)) {
      enemies.splice(i, 1);
      scene.remove(enemy._model)
      defence.handleShipAttacked();

      const newEnemy = randomEnemy(enemyModel.clone());
      scene.add(newEnemy._model);
      enemies.push(newEnemy);
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
          hero.handleEnemyKill();

          const newEnemy = randomEnemy(enemyModel.clone());
          scene.add(newEnemy._model);
          enemies.push(newEnemy);
        }
      });
    }
  });

  renderer.update();
};
