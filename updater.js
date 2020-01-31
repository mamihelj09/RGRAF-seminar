import * as THREE from 'three';

import { SPEED, SHOOT_DISTANCE, MAX_ENEMY_NUMBER } from './consts';

export function updater(opts) {
  const { renderer, scene, clock, state } = opts;

  // check if game is over
  if (state.defence.isDead() || state.hero.isDead()) {
    renderer.infoText.innerText = 'GAME OVER';
    renderer.infoBox.removeChild(renderer.infoBtn);
    renderer.infoBox.classList.remove('hidden');
    return;
  }

  // check if spawn boss
  if (state.hero.getScore() > 0 && state.hero.getScore() % 50 === 0 && !state.isBossModeOn) {
    // ADD BOSS
    state.boss = scene.addBoss(new THREE.Vector3(180, 0 , 20));
    state.isBossModeOn = true;
  }

  requestAnimationFrame(() => updater(opts));
  const delta = clock.getDelta();
  state.defence.rotatePlanet();

  // spawn random enemy
  if (clock.getElapsedTime() % 10 < 0.01 && state.enemies.length <= MAX_ENEMY_NUMBER && !state.isBossModeOn) {
    state.enemies.push(scene.addRandomEnemy());
  }

  // handle boss colision
  if (state.boss) {
    if (!state.boss.checkColision(state.hero)) {
      state.boss._model.translateX(-(SPEED / 10) * delta);
    } else {
      scene.removeFromScene(state.boss);
      state.boss = null;
      state.isBossModeOn = false;

      state.hero.handleShipAttacked();
    }
  }

  // check all enemies colisions
  state.enemies.forEach((enemy, i) => {
    if (!enemy.checkColision(state.hero)) {
      enemy._model.translateX(-(SPEED / 5) * delta);
    } else {
      scene.removeFromScene(enemy);
      state.enemies.splice(i, 1);
      state.hero.handleShipAttacked();

      if (!state.isBossModeOn) {
        state.enemies.push(scene.addRandomEnemy());
      }
    }

    if (enemy.checkColision(state.defence)) {
      state.enemies.splice(i, 1);
      scene.removeFromScene(enemy)
      state.defence.handleShipAttacked();

      if (!state.isBossModeOn) {
        state.enemies.push(scene.addRandomEnemy());
      }
    }
  });

  // check bullets colisions
  state.bullets.forEach((bullet, i) => {
    if (bullet.getPosition().x > SHOOT_DISTANCE) {
      state.bullets.splice(i, 1);
      scene.removeFromScene(bullet)
    } else {
      bullet.translateX(SPEED * delta);

      if (state.isBossModeOn && state.boss.checkColision(bullet)) {
        state.bullets.splice(i, 1);
        scene.removeFromScene(bullet)

        if (state.boss.handleBulletHit() < 1) {
          scene.removeFromScene(bullet)
          scene.removeFromScene(state.boss);
          state.boss = null;
          state.isBossModeOn = false;

          state.hero.handleEnemyKill();
          state.enemies.push(scene.addRandomEnemy());
        }
      }

      state.enemies.forEach((enemy, j) => {
        if (enemy.checkColision(bullet)) {
          state.bullets.splice(i, 1);
          scene.removeFromScene(bullet)

          state.enemies.splice(j, 1);
          scene.removeFromScene(enemy)
          state.hero.handleEnemyKill();

          if (!state.isBossModeOn) {
            state.enemies.push(scene.addRandomEnemy());
          }
        }
      });
    }
  });

  renderer.update();
};
