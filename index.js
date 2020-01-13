import * as THREE from 'three';

import { Bullet } from './Bullet';
import { Camera } from './Camera';
import { Hero } from './Hero';
import { Renderer } from './Renderer';
import { Terrain } from './Terrain';
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
  const { heroModel, enemyModel, planetModel } = loadedModels;
  const scene = new THREE.Scene();
  const camera = new Camera(new THREE.Vector3(-30, 80, 50), scene.position);
  const renderer = new Renderer(scene, camera._model);
  const clock = new THREE.Clock();

  const scoreElement = document.getElementById('score');
  const defenceElement = document.getElementById('defence');

  document.getElementById('app').appendChild(renderer._model.domElement);

  const enemies = [];
  const bullets = [];
  let delta = 0;
  let kills = 0;
  let defenceScore = 100;
  scoreElement.innerHTML = kills;
  defenceElement.innerHTML = defenceScore;

  // // CREATE TERRAIN
  // const terrain = new Terrain();
  // scene.add(terrain._model);

  // CREATE HERO
  const hero = new Hero(heroModel.clone(), new THREE.Vector3(-20, 0, 0));
  scene.add(hero._model);

  // CREATE DEFENCE
  const defence = new Defence(planetModel.clone(), new THREE.Vector3(-120, 0, 0));
  scene.add(defence._model);

  // CREATE ENEMY
  for(let i = 0; i < 3; i++) {
    const enemy = randomEnemy(enemyModel.clone());
    scene.add(enemy._model);
    enemies.push(enemy);
  }

  renderer.update();

  document.getElementById('start').addEventListener('click', () => updater({renderer, scene, camera, clock, enemies, bullets, hero, defence}));
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
