import * as THREE from 'three';

export class Bullet {
  constructor(position) {
    this._model = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 4), new THREE.MeshBasicMaterial({color: 'white'}));
    this._model.position.copy(position);

    this._boundery = new THREE.BoxHelper(this._model);
    this._boundery.geometry.computeBoundingBox();

    this.translateX(10);
  }

  translateX(offset) {
    this._model.translateX(offset);
  }

  getPosition() {
    return this._model.position;
  }
}
