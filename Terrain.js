import * as THREE from 'three';

export class Terrain {
  constructor() {
    const terrainGeometry = new THREE.PlaneGeometry(900, 140, 1, 1);
    const terrainMaterial = new THREE.MeshBasicMaterial({color: 'rgb(10, 200, 10)'});
    this._model = new THREE.Mesh(terrainGeometry, terrainMaterial);
    this._model.rotation.x = -0.5 * Math.PI;
    this._model.position.y = -20;
  }
}
