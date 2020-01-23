import * as THREE from 'three';

import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { Scene } from './Scene';

import { modelLoader } from './loader';
import { updater } from './updater';
import {
  KEY_RIGHT,
  KEY_LEFT,
  KEY_TOP,
  KEY_BOTTOM,
  KEY_SPACE,
} from './consts';

modelLoader().then((loadedModels) => {
  const { heroModel, enemyModel, bossModel } = loadedModels;
  const scene = new Scene(heroModel, enemyModel, bossModel);
  const camera = new Camera(new THREE.Vector3(-60, 90, 100), scene.getPosition());
  const renderer = new Renderer(scene, camera);
  const clock = new THREE.Clock();

  document.getElementById('app').appendChild(renderer._model.domElement);

  const state = {
    isBossModeOn: false,
    enemies: [],
    bullets: [],
    boss: null,
    hero: null,
    defence: null,
  };

  // ADD LIGHT
  scene.addToScene(new THREE.HemisphereLight('#000', 'white', 2))

  // CREATE HERO
  state.hero = scene.addHero(new THREE.Vector3(-25, -2, 20));

  // CREATE DEFENCE
  state.defence = scene.addDefence(new THREE.Vector3(-120, 0, 0))

  // CREATE ENEMY
  state.enemies.push(scene.addRandomEnemy());

  renderer.update();

  // start game button
  renderer.infoBtn.addEventListener('click', () => {
    renderer.infoBox.classList.add('hidden');
    updater({renderer, scene, camera, clock, state});
  });

  // controls
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === KEY_RIGHT) {
      state.hero.moveRight();
    } else if (e.keyCode === KEY_LEFT) {
      state.hero.moveLeft();
    } else if (e.keyCode === KEY_TOP) {
      state.hero.moveUp();
    } else if (e.keyCode === KEY_BOTTOM) {
      state.hero.moveDown();
    } else if (e.keyCode === KEY_SPACE) {
      state.bullets.push(scene.addBullet(state.hero.getPosition()));
    }
  })
})
