import * as THREE from 'three';

export class Hero {
  constructor(model, position) {
    const geometry = new THREE.BoxGeometry(12, 12, 12);
    const material = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});

    this._ship = model;
    this._ship.position.set(0, 0, 0);
    this._ship.scale.set(0.1, 0.1, 0.1);
    this._ship.rotateZ(1.6);
    this._ship.rotateY(0);
    this._ship.rotateX(0);

    this._model = new THREE.Mesh(geometry, material);
    this._model.add(this._ship);
    this._model.geometry.computeBoundingBox();
    this._model.position.copy(position);

    this._health = 100;
    this._score = 0;
  }

  moveRight(offset) {
    if (this._model.position.z < 35) {
      this._model.position.z += 0.5 ;
    }
    this._model.rotation.x += 0.03;

    setTimeout(() => {
      this._model.rotation.x -= 0.03;
    }, 300)
  }

  moveLeft(offset) {
    if (this._model.position.z > -35) {
      this._model.position.z -= 0.5 ;
    }
    this._model.rotation.x -= 0.03;

    setTimeout(() => {
      this._model.rotation.x += 0.03;
    }, 300)
  }

  moveUp() {
    if (this._model.position.x < 30) {
      this._model.position.x += 1 ;
    }
    this._model.rotation.z -= 0.01;

    setTimeout(() => {
      this._model.rotation.z += 0.01;
    }, 300)
  }

  moveDown() {
    if (this._model.position.x > -40) {
      this._model.position.x -= 1;
    }
    this._model.rotation.z += 0.01;

    setTimeout(() => {
      this._model.rotation.z -= 0.01;
    }, 300)
  }

  getPosition() {
    return this._model.position;
  }

  handleShipAttacked() {
    this._health -= 10;
    const shipHealthElement = document.getElementById('ship-health');

    if (shipHealthElement) {
      shipHealthElement.innerText = this._health;
    }
  }

  isDead() {
    return this._health < 1;
  }

  handleEnemyKill() {
    this._score += 1;
    const scoreElement = document.getElementById('score');

    if (scoreElement) {
      scoreElement.innerText = this._score;
    }
  }
}
