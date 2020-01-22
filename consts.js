export const KEY_RIGHT = 39;
export const KEY_LEFT = 37;
export const KEY_TOP = 38;
export const KEY_BOTTOM = 40;
export const KEY_SPACE = 32;

export const MAX_RESPAWN_X = 190;
export const MIN_RESPAWN_X = 130;
export const MAX_RESPAWN_Z = 35;
export const MIN_RESPAWN_Z = -35;

export const SPEED = 50;
export const SHOOT_DISTANCE = MIN_RESPAWN_X;
export const MAX_ENEMY_NUMBER = 10;

export const LEFT_RIGHT_MOVE_SPEED = 0.8;
export const LEFT_RIGHT_ROTATION_ANGLE = 0.03;
export const FRONT_BACK_MOVE_SPEED = 1;
export const FRONT_BACK_ROTATION_ANGLE = 0.01;

export const SHIP_MOVEMENT_BOUNDERIES = {
  TOP: 30,
  BOTTOM: -40,
  LEFT: MIN_RESPAWN_Z,
  RIGHT: MAX_RESPAWN_Z,
};

export const HEALTH_BONUS = 'health';
export const MULTY_BULLET_BONUS = 'multy';
export const BONUSES = {
  0: MULTY_BULLET_BONUS,
  1: HEALTH_BONUS,
};
