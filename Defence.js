import * as THREE from 'three';

export class Defence {
  constructor(model, position) {
    this._model = model;
    this._model.position.copy(position);
    this._model.scale.set(60, 60, 60);
    this._model.rotateZ(0.35)

    this._boundery = new THREE.BoxHelper(this._model);
    this._boundery.geometry.computeBoundingBox();
  }

  getPosition() {
    return this._model.position;
  }
}
