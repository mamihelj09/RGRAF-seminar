import * as THREE from 'three';

import { Boss } from './Boss';
import { randomEnemy } from './helpers';
import { SPEED, SHOOT_DISTANCE, MAX_ENEMY_NUMBER } from './consts';

export function updater(opts) {
  const { renderer, scene, clock, hero, defence, enemyModel, bossModel, state } = opts;

  if (defence.isDead() || hero.isDead()) {
    renderer.infoText.innerText = "GAME OVER";
    renderer.infoBox.removeChild(renderer.infoBtn);
    renderer.infoBox.classList.remove('hidden');
    return;
  } else if (hero.getScore() > 0 && hero.getScore() % 50 === 0 && !state.isBossModeOn) {
    state.isBossModeOn = true;

    // ADD BOSS
    const boss = new Boss(bossModel.clone(), new THREE.Vector3(180, 0 , 20))
    scene.add(boss._model);
    state.boss = boss;
  }

  requestAnimationFrame(() => updater(opts));
  const delta = clock.getDelta();
  defence.rotatePlanet();

  // create "random" enemy
  if (clock.getElapsedTime() % 10 < 0.01 && state.enemies.length <= MAX_ENEMY_NUMBER && !state.isBossModeOn) {
    const newEnemy = randomEnemy(enemyModel.clone());
    scene.add(newEnemy._model);
    state.enemies.push(newEnemy);
  }

  // handle boss colision
  if (state.boss !== null) {
    if (!state.boss.checkColision(hero)) {
      state.boss._model.translateX(-(SPEED / 10) * delta);
    } else {
      scene.remove(state.boss._model);
      state.boss = null;
      state.isBossModeOn = false;

      hero.handleShipAttacked();
    }
  }

  // check all enemies colisions
  state.enemies.forEach((enemy, i) => {
    if (!enemy.checkColision(hero)) {
      enemy._model.translateX(-(SPEED / 5) * delta);
    } else {
      scene.remove(enemy._model);
      state.enemies.splice(i, 1);
      hero.handleShipAttacked();

      if (!state.isBossModeOn) {
        const newEnemy = randomEnemy(enemyModel.clone());
        scene.add(newEnemy._model);
        state.enemies.push(newEnemy);
      }
    }

    if (enemy.checkColision(defence)) {
      state.enemies.splice(i, 1);
      scene.remove(enemy._model)
      defence.handleShipAttacked();

      if (!state.isBossModeOn) {
        const newEnemy = randomEnemy(enemyModel.clone());
        scene.add(newEnemy._model);
        state.enemies.push(newEnemy);
      }
    }
  });

  // check bullets colisions
  state.bullets.forEach((bullet, i) => {
    if (bullet.getPosition().x > SHOOT_DISTANCE) {
      state.bullets.splice(i, 1);
      scene.remove(bullet._model)
    } else {
      bullet.translateX(SPEED * delta);


      if (state.isBossModeOn && state.boss.checkColision(bullet)) {
        state.bullets.splice(i, 1);
        scene.remove(bullet._model)

        if (state.boss.handleBulletHit() < 1) {
          scene.remove(bullet._model)
          scene.remove(state.boss._model);
          state.boss = null;
          state.isBossModeOn = false;

          hero.handleEnemyKill();
          const newEnemy = randomEnemy(enemyModel.clone());
          scene.add(newEnemy._model);
          state.enemies.push(newEnemy);
        }
      }

      state.enemies.forEach((enemy, j) => {
        if (enemy.checkColision(bullet)) {

          state.bullets.splice(i, 1);
          scene.remove(bullet._model)

          state.enemies.splice(j, 1);
          scene.remove(enemy._model)
          hero.handleEnemyKill();

          if (!state.isBossModeOn) {
            const newEnemy = randomEnemy(enemyModel.clone());
            scene.add(newEnemy._model);
            state.enemies.push(newEnemy);
          }
        }
      });
    }
  });

  renderer.update();
};
