import * as THREE from 'three';

import { Enemy } from './Enemy';
import {
  MAX_RESPAWN_X,
  MIN_RESPAWN_X,
  MAX_RESPAWN_Z,
  MIN_RESPAWN_Z
} from './consts';

export function randomEnemy(screen, enemies) {
  const randX = Math.floor(Math.random() * (MAX_RESPAWN_X - (MIN_RESPAWN_X) + 1) + (MIN_RESPAWN_X));
  const randZ = Math.floor(Math.random() * (MAX_RESPAWN_Z - (MIN_RESPAWN_Z) + 1) + (MIN_RESPAWN_Z));
  const enemy = new Enemy(new THREE.Vector3(randX, 0, randZ));
  screen.add(enemy._model);
  enemies.push(enemy);
}
