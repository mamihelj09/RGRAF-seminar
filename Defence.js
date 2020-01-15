import * as THREE from 'three';

export class Defence {
  constructor(position) {
    const planetGeometry = new THREE.IcosahedronGeometry(50, 1);
    const orbitGeometry = new THREE.IcosahedronGeometry(60, 1);
    const planetMatherial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading
    });
    const orbitMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      side: THREE.DoubleSide
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
    this._health -= 100;
    const planetHealthElement = document.getElementById('planet-health');

    if (planetHealthElement) {
      planetHealthElement.innerText = this._health;
    }
  }

  isDead() {
    return this._health < 1;
  }
}
