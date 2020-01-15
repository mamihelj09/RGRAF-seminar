import * as THREE from 'three';

export class Renderer {
  constructor(screen, camera) {
    this._model = new THREE.WebGLRenderer({alpha: true});
    this._model.setSize(1200, 700);
    this._model.autoClear = false;
    this._model.setClearColor(0x000000, 0.0);

    this._screen = screen;
    this._camera = camera;
  }

  update() {
    this._model.render(this._screen, this._camera);
  }
}
