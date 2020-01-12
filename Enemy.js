import * as THREE from 'three';

import { HEALTH_BONUS, MULTY_BULLET_BONUS } from './consts';

export class Enemy {
  constructor(position) {
    const _heroGeometry = new THREE.BoxGeometry(20, 1, 10)
    const _heroMaterial = new THREE.MeshBasicMaterial({color: 'rgb(0, 0, 255)'});
    this._model = new THREE.Mesh(_heroGeometry, _heroMaterial);
    this.bonus = this._generateBonus();
    this._model.geometry.computeBoundingBox();

    // SET INITAL POSITION
    this._model.position.copy(position)
  }

  _generateBonus() {
    const random = Math.floor((Math.random() * 99) + 1)

    if (random % 5 === 0) {
      return HEALTH_BONUS;
    } else if (random % 3 === 0) {
      return MULTY_BULLET_BONUS;
    } else {
      return null;
    }
  }

  getPosition() {
    return this._model.position;
  }

  checkColision(object) {
    this._model.updateMatrixWorld();
    object._model.updateMatrixWorld();

    const thisBox = this._model.geometry.boundingBox.clone();
    thisBox.applyMatrix4(this._model.matrixWorld);

    const objectBox = object._model.geometry.boundingBox.clone();
    objectBox.applyMatrix4(object._model.matrixWorld);

    return thisBox.intersectsBox(objectBox);
  }
}
