import * as THREE from 'three';

import { Enemy } from './Enemy';
import {
  MAX_RESPAWN_X,
  MIN_RESPAWN_X,
  MAX_RESPAWN_Z,
  MIN_RESPAWN_Z
} from './consts';

export function randomEnemy(model) {
  const randX = Math.floor(Math.random() * (MAX_RESPAWN_X - (MIN_RESPAWN_X) + 1) + (MIN_RESPAWN_X));
  const randZ = Math.floor(Math.random() * (MAX_RESPAWN_Z - (MIN_RESPAWN_Z) + 1) + (MIN_RESPAWN_Z));
  return new Enemy(model, new THREE.Vector3(randX, 0, randZ));
}
