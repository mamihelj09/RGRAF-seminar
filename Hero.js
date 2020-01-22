import * as THREE from 'three';

import {
  LEFT_RIGHT_MOVE_SPEED,
  FRONT_BACK_MOVE_SPEED,
  LEFT_RIGHT_ROTATION_ANGLE,
  FRONT_BACK_ROTATION_ANGLE,
  SHIP_MOVEMENT_BOUNDERIES,
} from './consts';

export class Hero {
  constructor(model, position) {
    const geometry = new THREE.BoxGeometry(12, 12, 12);
    const material = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});

    this._ship = model;
    this._ship.position.set(0, 0, 0);
    this._ship.scale.set(0.1, 0.1, 0.1);
    this._ship.rotateZ(1.6);
    this._ship.rotateY(0);
    this._ship.rotateX(0);

    this._model = new THREE.Mesh(geometry, material);
    this._model.add(this._ship);
    this._model.geometry.computeBoundingBox();
    this._model.position.copy(position);

    this._health = 100;
    this._score = 0;
  }

  moveRight() {
    if (this._model.position.z < SHIP_MOVEMENT_BOUNDERIES.RIGHT) {
      this._model.position.z += LEFT_RIGHT_MOVE_SPEED ;
    }
    this._model.rotation.x += LEFT_RIGHT_ROTATION_ANGLE;

    setTimeout(() => {
      this._model.rotation.x -= LEFT_RIGHT_ROTATION_ANGLE;
    }, 300)
  }

  moveLeft() {
    if (this._model.position.z > SHIP_MOVEMENT_BOUNDERIES.LEFT) {
      this._model.position.z -= LEFT_RIGHT_MOVE_SPEED ;
    }
    this._model.rotation.x -= LEFT_RIGHT_ROTATION_ANGLE;

    setTimeout(() => {
      this._model.rotation.x += LEFT_RIGHT_ROTATION_ANGLE;
    }, 300)
  }

  moveUp() {
    if (this._model.position.x < SHIP_MOVEMENT_BOUNDERIES.TOP) {
      this._model.position.x += FRONT_BACK_MOVE_SPEED ;
    }
    this._model.rotation.z -= FRONT_BACK_ROTATION_ANGLE;

    setTimeout(() => {
      this._model.rotation.z += FRONT_BACK_ROTATION_ANGLE;
    }, 300)
  }

  moveDown() {
    if (this._model.position.x > SHIP_MOVEMENT_BOUNDERIES.BOTTOM) {
      this._model.position.x -= FRONT_BACK_MOVE_SPEED;
    }
    this._model.rotation.z += FRONT_BACK_ROTATION_ANGLE;

    setTimeout(() => {
      this._model.rotation.z -= FRONT_BACK_ROTATION_ANGLE;
    }, 300)
  }

  getPosition() {
    return this._model.position;
  }

  handleShipAttacked() {
    this._health -= 10;
    const shipHealthElement = document.getElementById('ship-health');

    if (shipHealthElement) {
      shipHealthElement.innerText = this._health;
    }
  }

  isDead() {
    return this._health < 1;
  }

  handleEnemyKill() {
    this._score += 1;
    const scoreElement = document.getElementById('score');

    if (scoreElement) {
      scoreElement.innerText = this._score;
    }
  }
}
