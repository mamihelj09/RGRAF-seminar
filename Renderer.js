import * as THREE from 'three';

export class Renderer {
  constructor(screen, camera) {
    this._model = new THREE.WebGLRenderer();
    this._model.setSize(1200, 700);
    this._model.setClearColor('rgb(247, 245, 225)');

    this._screen = screen;
    this._camera = camera;
  }

  update() {
    this._model.render(this._screen, this._camera);
  }
}
