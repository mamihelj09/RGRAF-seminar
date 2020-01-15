import * as THREE from 'three';

export class Renderer {
  constructor(screen, camera) {
    this._model = new THREE.WebGLRenderer({alpha: true});
    this._model.setSize(window.innerWidth, window.innerHeight);
    this._model.autoClear = false;
    this._model.setClearColor(0x000000, 0.0);
    this.infoBox = document.getElementById('hidden-info-box');
    this.infoText = document.getElementById('hidden-info-text');
    this.infoBtn = document.getElementById('hidden-info-btn');

    this._screen = screen;
    this._camera = camera;
    document.getElementById('app').appendChild(this._model.domElement);
  }

  update() {
    this._model.render(this._screen, this._camera);
  }
}
