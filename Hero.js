import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import ship_hero from './assets/ship_good.glb';

export class Hero {
  constructor(model, position) {
    this._model = model;
    this._model.scale.set(0.1, 0.1, 0.1);
    this._model.rotateZ(1.6);
    this._model.position.copy(position)
    this._boundery = new THREE.BoxHelper(this._model);
    this._boundery.geometry.computeBoundingBox();
  }

  moveRight(offset) {
    if (this._model.position.z < 35) {
      this._model.position.z += 0.5 ;
    }
    this._model.rotation.x += 0.03;

    setTimeout(() => {
      this._model.rotation.x -= 0.03;
    }, 300)
  }

  moveLeft(offset) {
    if (this._model.position.z > -35) {
      this._model.position.z -= 0.5 ;
    }
    this._model.rotation.x -= 0.03;

    setTimeout(() => {
      this._model.rotation.x += 0.03;
    }, 300)
  }

  moveUp() {
    if (this._model.position.x < 30) {
      this._model.position.x += 1 ;
    }
    this._model.rotation.z -= 0.01;

    setTimeout(() => {
      this._model.rotation.z += 0.01;
    }, 300)
  }

  moveDown() {
    if (this._model.position.x > -40) {
      this._model.position.x -= 1;
    }
    this._model.rotation.z += 0.01;

    setTimeout(() => {
      this._model.rotation.z -= 0.01;
    }, 300)
  }

  getPosition() {
    return this._model.position;
  }
}
