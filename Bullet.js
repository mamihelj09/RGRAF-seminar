import * as THREE from 'three';

export class Bullet {
  constructor(position) {
    this._model = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 4), new THREE.MeshBasicMaterial({color: "aqua"}));
    this._model.geometry.computeBoundingBox();
    this._model.position.copy(position);
    this.translateX(10);
  }

  translateX(offset) {
    this._model.translateX(offset);
  }

  getPosition() {
    return this._model.position;
  }
}
