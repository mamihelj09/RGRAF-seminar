import * as THREE from 'three';

import { HEALTH_BONUS, MULTY_BULLET_BONUS } from './consts';

export class Enemy {
  constructor(model, position) {
    this._model = model;
    this._model.position.copy(position);
    this._model.scale.set(0.15, 0.15, 0.15);
    this._model.rotateZ(-1.6);
    this._model.rotateX(0.2);
    this._boundery = new THREE.BoxHelper(this._model);
    this._boundery.geometry.computeBoundingBox();
    this.bonus = this._generateBonus();
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
    this._boundery.updateMatrixWorld();
    object._boundery.updateMatrixWorld();

    const thisBox = this._boundery.geometry.boundingBox.clone();
    thisBox.applyMatrix4(this._boundery.matrixWorld);

    const objectBox = object._boundery.geometry.boundingBox.clone();
    objectBox.applyMatrix4(object._boundery.matrixWorld);

    return thisBox.intersectsBox(objectBox);
  }
}
