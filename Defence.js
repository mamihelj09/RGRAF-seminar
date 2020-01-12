import * as THREE from 'three';

export class Defence {
  constructor(position) {
    const _heroGeometry = new THREE.BoxGeometry(4, 1, 90)
    const _heroMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 0)'});
    this._model = new THREE.Mesh(_heroGeometry, _heroMaterial);
    this._model.geometry.computeBoundingBox();

    // SET INITAL POSITION
    this._model.position.copy(position)
  }

  getPosition() {
    return this._model.position;
  }
}
