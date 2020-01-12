import * as THREE from 'three';

import { Bullet } from './Bullet';
import { Camera } from './Camera';
import { Hero } from './Hero';
import { Renderer } from './Renderer';
import { Terrain } from './Terrain';
import { Defence } from './Defence';

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

const scene = new THREE.Scene();
const camera = new Camera(new THREE.Vector3(-30, 80, 50), scene.position);
const renderer = new Renderer(scene, camera._model);
const clock = new THREE.Clock();

const scoreElement = document.getElementById('score');
const defenceElement = document.getElementById('defence');

const enemies = [];
const bullets = [];
let delta = 0;
let kills = 0;
let defenceScore = 100;


document.getElementById('app').appendChild(renderer._model.domElement);
scoreElement.innerHTML = kills;
defenceElement.innerHTML = defenceScore;

// CREATE TERRAIN
const terrain = new Terrain();
scene.add(terrain._model);

// CREATE HERO
const hero = new Hero(new THREE.Vector3(-20, 0, 0));
scene.add(hero._model);

// CREATE DEFENCE
const defence = new Defence(new THREE.Vector3(-60, 0, 0));
scene.add(defence._model);

// CREATE ENEMY
for(let i = 0; i < 3; i++) {
  randomEnemy(scene, enemies);
}

renderer.update();

function update() {
  if (defence < 1) {
    return;
  }
  requestAnimationFrame(update);
  delta = clock.getDelta();

  enemies.forEach((enemy, i) => {
    if (!enemy.checkColision(hero)) {
      enemy._model.translateX(-(SPEED / 5) * delta);
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

      defenceScore = defenceScore - 10;
      defenceElement.innerHTML = defenceScore;
      randomEnemy(scene, enemies);
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

document.getElementById('start').addEventListener('click', () => update())
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
  renderer.update();
})
