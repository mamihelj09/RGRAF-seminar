import * as THREE from 'three';

import canvasEarth from '../assets/earth.jpg'
import canvasCloud from '../assets/clouds.jpg'

export class Defence {
  constructor(position) {
    const planetGeometry = new THREE.IcosahedronGeometry(50, 6);
    const orbitGeometry = new THREE.IcosahedronGeometry(55, 6);
    const planetMatherial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture(canvasEarth),
      color: '#03adfc',
      opacity: 1,
      shading: THREE.FlatShading
    });
    const orbitMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture(canvasCloud),
      side: THREE.DoubleSide,
      opacity: 0.1,
      transparent: true,
      depthWrite: false,
    });

    this._orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

    this._model = new THREE.Mesh(planetGeometry, planetMatherial);
    this._model.position.copy(position);
    this._model.geometry.computeBoundingBox();
    this._model.add(this._orbit);

    this._health = 100;
  }

  getPosition() {
    return this._model.position;
  }

  handleShipAttacked() {
    this._health -= 10;
    const planetHealthElement = document.getElementById('planet-health');

    if (planetHealthElement) {
      planetHealthElement.innerText = this._health;
    }
  }

  isDead() {
    return this._health < 1;
  }

  rotatePlanet() {
    this._model.rotateY(0.0005);
    this._orbit.rotateY(-0.0009);
  }
}
