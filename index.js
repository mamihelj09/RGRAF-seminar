import * as THREE from 'three';

import { Bullet } from './Bullet';
import { Camera } from './Camera';
import { Hero } from './Hero';
import { Renderer } from './Renderer';
import { Terrain } from './Terrain';

import { KEY_RIGHT, KEY_LEFT, KEY_TOP, KEY_BOTTOM, KEY_SPACE, SPEED, SHOOT_DISTANCE } from './consts';

const scene = new THREE.Scene();
const camera = new Camera(new THREE.Vector3(-30, 80, 50), scene.position);
const renderer = new Renderer(scene, camera._model);
const clock = new THREE.Clock();
document.getElementById('app').appendChild(renderer._model.domElement);

const bullets = [];
let delta = 0;

(function update() {
  requestAnimationFrame(update);
  delta = clock.getDelta();

  bullets.forEach((b, i) => {
    if (b.getPosition().x > SHOOT_DISTANCE) {
      bullets.splice(i, 1);
      scene.remove(b._model)
    } else {
      b.translateX(SPEED * delta);
    }
  });
  renderer.update();
})()

// CREATE TERRAIN
const terrain = new Terrain();
scene.add(terrain._model);

// CREATE HERO
const hero = new Hero(new THREE.Vector3(-20, 0, 0));
scene.add(hero._model);

renderer.update();

window.addEventListener('keydown', (e) => {
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
  renderer.update();
})
