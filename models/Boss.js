import * as THREE from 'three';

import { HEALTH_BONUS, MULTY_BULLET_BONUS } from '../consts';

export class Boss {
  constructor(model, position) {
    const geometry = new THREE.BoxGeometry(12, 12, 12);
    const material = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});

    this._ship = model;
    this._ship.position.set(0, 0, 0);
    this._ship.scale.set(1.8, 1.8, 1.8);
    this._ship.rotateZ(-1.55);
    this._ship.rotateX(0);

    this._model = new THREE.Mesh(geometry, material);
    this._model.add(this._ship);
    this._model.geometry.computeBoundingBox();
    this._model.position.copy(position);


    this.healt = 20;
    this.bonus = this._generateBonus();
    this._hpWrapper = document.getElementById('boss-wrapper');
    this._hpScore = document.getElementById('boss-hp');

    this._hpWrapper.classList.remove('hidden');
    this._hpScore.style.width = '400px';
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

  handleBulletHit() {
    if (this.healt > 0) {
      this.healt = this.healt - 1;
      this._hpScore.style.width = `${this.healt * 20}px`;
    }

    return this.healt;
  }
}
