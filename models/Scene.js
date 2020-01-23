import * as THREE from 'three';

import { Hero } from './Hero';
import { Defence } from './Defence';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { Boss } from './Boss';

import {
  MAX_RESPAWN_X,
  MIN_RESPAWN_X,
  MAX_RESPAWN_Z,
  MIN_RESPAWN_Z
} from '../consts';

export class Scene {
  constructor(heroModel, enemyModel, bossModel) {
    this._model = new THREE.Scene();

    this._heroModel = heroModel;
    this._enemyModel = enemyModel;
    this._bossModel = bossModel;
  }

  getPosition() {
    return this._model.position;
  }

  removeFromScene(model) {
    this._model.remove(model._model);
  }

  addToScene(model) {
    this._model.add(model);
    return model;
  }

  addHero(position) {
    const hero = new Hero(this._heroModel.clone(), position);
    this._model.add(hero._model);
    return hero;
  }

  addDefence(position) {
    const defence = new Defence(position);
    this._model.add(defence._model);
    return defence;
  }

  addBullet(position) {
    const bullet = new Bullet(position);
    this._model.add(bullet._model);
    return bullet;
  }

  addBoss(position) {
    const boss = new Boss(this._bossModel.clone(), position)
    this._model.add(boss._model);
    return boss;
  }

  addRandomEnemy() {
    const randX = Math.floor(Math.random() * (MAX_RESPAWN_X - (MIN_RESPAWN_X) + 1) + (MIN_RESPAWN_X));
    const randZ = Math.floor(Math.random() * (MAX_RESPAWN_Z - (MIN_RESPAWN_Z) + 1) + (MIN_RESPAWN_Z));
    const enemy =  new Enemy(this._enemyModel.clone(), new THREE.Vector3(randX, 0, randZ));

    this._model.add(enemy._model);
    return enemy;
  }
}
