import * as THREE from 'three';

import { Bullet } from './Bullet';
import { Camera } from './Camera';
import { Hero } from './Hero';
import { Renderer } from './Renderer';
import { Defence } from './Defence';

import { modelLoader } from './loader';
import { updater } from './updater';

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

modelLoader().then((loadedModels) => {
  const { heroModel, enemyModel, bossModel } = loadedModels;
  const scene = new THREE.Scene();
  const camera = new Camera(new THREE.Vector3(-60, 90, 100), scene.position);
  const renderer = new Renderer(scene, camera._model);
  const clock = new THREE.Clock();

  document.getElementById('app').appendChild(renderer._model.domElement);

  const enemies = [];
  const bullets = [];

  // ADD LIGHT
  const light = new THREE.HemisphereLight('#000', 'white', 2);
  scene.add(light);

  // CREATE HERO
  const hero = new Hero(heroModel.clone(), new THREE.Vector3(-25, -2, 20));
  scene.add(hero._model);

  // CREATE DEFENCE
  const defence = new Defence(new THREE.Vector3(-120, 0, 0));
  scene.add(defence._model);

  // CREATE ENEMY
  const enemy = randomEnemy(enemyModel.clone());
  scene.add(enemy._model);
  enemies.push(enemy);

  renderer.update();

  renderer.infoBtn.addEventListener('click', () => {
    renderer.infoBox.classList.add('hidden');
    updater({renderer, scene, camera, clock, enemies, bullets, hero, defence, enemyModel});
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === KEY_RIGHT) {
      hero.moveRight();
    } else if (e.keyCode === KEY_LEFT) {
      hero.moveLeft();
    } else if (e.keyCode === KEY_TOP) {
      hero.moveUp();
    } else if (e.keyCode === KEY_BOTTOM) {
      hero.moveDown();
    } else if (e.keyCode === KEY_SPACE) {
      const bullet = new Bullet(hero.getPosition());
      scene.add(bullet._model);
      bullets.push(bullet);
    }
  })
})
