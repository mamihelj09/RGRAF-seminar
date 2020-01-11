import * as THREE from 'three';

export class Camera {
  constructor(position, sceenPosition) {
    this._model = new THREE.PerspectiveCamera(70, 1200/700, 0.1, 1000);
    this._model.position.copy(position);
    this._model.lookAt(sceenPosition);
  }
}
