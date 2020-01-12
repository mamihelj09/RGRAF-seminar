import * as THREE from 'three';

export class Hero {
  constructor(position) {
    const _heroGeometry = new THREE.BoxGeometry(20, 1, 10)
    const _heroMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255, 0, 0)'});
    this._model = new THREE.Mesh(_heroGeometry, _heroMaterial);
    this._model.geometry.computeBoundingBox();

    // SET INITAL POSITION
    this._model.position.copy(position)
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
